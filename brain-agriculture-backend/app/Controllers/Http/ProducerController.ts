import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";
import BrainAgricultureBadRequestException from "App/Exceptions/BrainAgricultureBadRequestException";
import BrainAgricultureNotFoundException from "App/Exceptions/BrainAgricultureNotFoundException";

import Producer from "App/Models/Producer";
import CreateProducerValidator from "App/Validators/CreateProducerValidator";

export default class ProducerController {
  /**
   * Find all producers
   * @returns {Producer[]}
   */
  public async findAll({ response }: HttpContextContract) {
    const producers = await Producer.query()
      .preload("documentType")
      .preload("plantedCrops")
      .orderBy("producerName")
      .select("*");
    return response.ok({
      producers: producers.map((producer) => producer.toJSON()),
    });
  }

  /**
   * Find producer by id
   * @param {HttpContextContract} params - params received in URL path variable
   * @returns {Producer}
   */
  public async findById({ params, response }: HttpContextContract) {
    const { id } = params;
    const producer = await Producer.query()
      .where("producerId", id)
      .preload("documentType")
      .preload("plantedCrops")
      .first();
    if (!producer)
      throw new BrainAgricultureNotFoundException("Producer not found");
    return response.ok({ producer });
  }

  /**
   * Create new producer via POST.
   *
   * @param {HttpContextContract} request.producerPayload - Producer request body
   * @param {HttpContextContract} request.plantedCropsPayload - List of planted crops used by producer
   *
   * @returns {Producer}
   */
  public async create({ request, response }: HttpContextContract) {
    const trx = await Database.beginGlobalTransaction();
    await request.validate(CreateProducerValidator);
    const producerPayload = request.all();
    const plantedCropsPayload = request.input("plantedCrops", []);

    try {
      const producer = await Producer.create(producerPayload, trx);

      if (plantedCropsPayload.length > 0) {
        await producer
          .related("plantedCrops")
          .attach(plantedCropsPayload.map((c) => c.plantedCropId));
      }

      trx.commit();
      return response.created({ producer });
    } catch (error) {
      trx.rollback();
      throw new BrainAgricultureBadRequestException(
        `Error in create producer. Details ${error.message}`
      );
    }
  }

  /**
   * Update a producer crop via PUT.
   *
   * @param {HttpContextContract} param - id of the producer to be updated
   * @param {HttpContextContract} request.producerPayload - request body of producer to be updated
   * @param {HttpContextContract} request.plantedCropsPayload - List of planted crops used by producer
   *
   * @returns {PlantedCrops}
   */
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const producer = await Producer.findBy("producerId", id);

    if (!producer)
      throw new BrainAgricultureNotFoundException(
        `Producer not found with given id ${id}`
      );

    await producer.related("plantedCrops").detach();
    const plantedCropsPayload = request.input("plantedCrops", []);

    if (plantedCropsPayload.length > 0) {
      await producer
        .related("plantedCrops")
        .attach(plantedCropsPayload.map((c) => c.plantedCropId));
    }

    const producerPayload = await request.validate(CreateProducerValidator);
    producer.merge(producerPayload);
    await producer.save();

    return response.ok({ producer });
  }

  /**
   * Remove a producer by id via DELETE.
   *
   * @param {HttpContextContract} param - id of the producer to be removed
   *
   * @returns {string} - message of success in delete
   */
  public async remove({ params, response }: HttpContextContract) {
    const { id } = params;
    const producer = await Producer.findBy("producerId", id);
    if (!producer)
      throw new BrainAgricultureNotFoundException(
        `Producer not found with given id ${id}`
      );
    if (producer.plantedCrops !== undefined) {
      await producer.related("plantedCrops").detach();
    }
    await producer.delete();
    return response.ok({message: "Producer deleted successfully"});
  }
}
