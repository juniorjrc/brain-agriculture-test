import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import BrainAgricultureBadRequestException from "App/Exceptions/BrainAgricultureBadRequestException";
import BrainAgricultureNotFoundException from "App/Exceptions/BrainAgricultureNotFoundException";
import PlantedCrops from "App/Models/PlantedCrops";
import CreatePlantedCrop from "App/Validators/CreatePlantedCropValidator";

export default class PlantedCropsController {
  /**
   * Find all planted crops
   * @returns {PlantedCrops[]}
   */
  public async findAll({ response }: HttpContextContract) {
    const plantedCrops = await PlantedCrops.query()
      .orderBy("plantedCropName")
      .select("*");
    return response.ok({ plantedCrops });
  }

  /**
   * Find planted crops by id
   * @param {HttpContextContract} params - params received in URL path variable
   * @returns {PlantedCrops}
   */
  public async findById({ params, response }: HttpContextContract) {
    const { id } = params;
    const plantedCrop = await PlantedCrops.findBy("plantedCropId", id);
    if (!plantedCrop)
      throw new BrainAgricultureNotFoundException("Planted crop not found");
    return response.ok({ plantedCrop });
  }

  /**
   * Find by plantedCropName via POST.
   *
   * @param {HttpContextContract} request.plantedCropName - planted crop name used in search
   *
   * @returns {PlantedCrops[]}
   */
  public async findByPlantedCropName({
    request,
    response,
  }: HttpContextContract) {
    const { plantedCropName } = request.only(["plantedCropName"]);

    const plantedCrop = await PlantedCrops.query().orderBy('plantedCropName').where(
      "plantedCropName",
      "like",
      `%${plantedCropName}%`
    );

    if (plantedCrop.length === 0)
      throw new BrainAgricultureNotFoundException("Planted crop not found");

    return response.ok({ plantedCrop });
  }

  /**
   * Create new planted crop via POST.
   *
   * @param {HttpContextContract} request.plantedCropPayload - Planted crop request body
   *
   * @returns {PlantedCrops}
   */
  public async create({ request, response }: HttpContextContract) {
    const plantedCropPayload = await request.validate(CreatePlantedCrop);
    try {
      const plantedCrop = await PlantedCrops.create(plantedCropPayload);
      return response.created({ plantedCrop });
    } catch (error) {
      throw new BrainAgricultureBadRequestException(
        `Error in create new planted crop. Details: ${error.message}`
      );
    }
  }

  /**
   * Update a planted crop via PUT.
   *
   * @param {HttpContextContract} param - id of the planted crop to be updated
   * @param {HttpContextContract} request.plantedCropPayload - request body of planted crop to be updated
   *
   * @returns {PlantedCrops}
   */
  public async update({ params, request, response }: HttpContextContract) {
    const { id } = params;
    const plantedCrop = await PlantedCrops.findBy("plantedCropId", id);

    if (!plantedCrop)
      throw new BrainAgricultureNotFoundException(
        `Planted crop not found with given id ${id}`
      );

    const plantedCropPayload = await request.validate(CreatePlantedCrop);
    plantedCrop.merge(plantedCropPayload);
    await plantedCrop.save();

    return response.ok({ plantedCrop });
  }

  /**
   * Remove a planted crop by id via DELETE.
   *
   * @param {HttpContextContract} param - id of the planted crop to be removed
   *
   * @returns {string} - message of success in delete
   */
  public async remove({ params, response }: HttpContextContract) {
    const { id } = params;
    const plantedCrop = await PlantedCrops.findBy("plantedCropId", id);
    if (!plantedCrop)
      throw new BrainAgricultureNotFoundException(
        `Planted crop not found with given id ${id}`
      );
    await plantedCrop.delete();
    return response.ok("Planted crop deleted successfully");
  }
}
