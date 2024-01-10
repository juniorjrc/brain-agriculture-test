import Factory from "@ioc:Adonis/Lucid/Factory";
import PlantedCrops from "App/Models/PlantedCrops";

export const PlantedCropsFactory = Factory.define(PlantedCrops, ({ faker }) => {
  return {
    plantedCropName: faker.name.title(),
  };
}).build();
