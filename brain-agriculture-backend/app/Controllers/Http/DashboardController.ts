import type { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Database from "@ioc:Adonis/Lucid/Database";

export default class DashboardController {
  /**
   * Get total producers/farms in quantity
   * @returns {totalProducers: number}
   */
  public async totalProducers({ response }: HttpContextContract) {
    const totalProducers = await Database.from("producer")
      .count("* as totalProducers")
      .first();
    return response.ok(totalProducers);
  }

  /**
   * Get sum of total farm area
   * @returns {totalFarmArea}
   */
  public async totalFarmArea({ response }: HttpContextContract) {
    const totalFarmArea = await Database.from("producer")
      .sum("total_area as totalFarmArea")
      .first();
    return response.ok(totalFarmArea);
  }

  /**
   * Get sum of producers by state
   * @returns {totalProducersByState}
   */
  public async producersByState({ response }: HttpContextContract) {
    const totalProducersByState = await Database.from("producer")
      .select("state")
      .count("* as totalProducersByState")
      .groupBy("state");
    return response.ok(totalProducersByState);
  }

  /**
   * Get quantity of crops
   * @returns {cropsCount}
   */
  public async cropsCountByType({ response }: HttpContextContract) {
    const cropsCount = await Database.from("producer_planted_crops")
      .join(
        "planted_crops",
        "producer_planted_crops.planted_crop_id",
        "planted_crops.planted_crop_id"
      )
      .select("planted_crops.planted_crop_name as plantedCrop")
      .count("* as total")
      .groupBy("planted_crops.planted_crop_name");

    return response.ok(cropsCount);
  }

    /**
   * Get total land area
   * @returns {landUseSummary}
   */
  public async landUseSummary({ response }: HttpContextContract) {
    const landUseSummary = await Database.from('producer').select(
      Database.raw('SUM(arable_area) as totalArableArea'),
      Database.raw('SUM(vegetation_area) as totalVegetationArea'),
      Database.raw('SUM(arable_area + vegetation_area) as totalLandArea')
    ).first();

    return response.ok(landUseSummary);
  }
}
