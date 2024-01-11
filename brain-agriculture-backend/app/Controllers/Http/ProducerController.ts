import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Producer from "App/Models/Producer";

export default class ProducerController {
  /**
   * Find all producers
   * @returns {Producer[]}
   */
  public async findAll({ response }: HttpContextContract) {
    const producers = await Producer.query()
      .preload("documentType")
      .orderBy("producerName")
      .select("*");
    return response.ok({ producers: producers.map(producer => producer.toJSON()) });
  }
}
