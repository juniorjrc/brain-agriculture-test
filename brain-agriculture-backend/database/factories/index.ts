import Factory from "@ioc:Adonis/Lucid/Factory";
import PlantedCrops from "App/Models/PlantedCrops";
import Producer from "App/Models/Producer";

const CPF = 1;
const CNPJ = 2;

export const PlantedCropsFactory = Factory.define(PlantedCrops, ({ faker }) => {
  return {
    plantedCropName: faker.name.title(),
  };
}).build();

export const ValidProducerWithCpfFactory = Factory.define(Producer, () => {
  return {
    documentTypeId: CPF,
    documentNumber: "153.061.810-07",
    producerName: "TST1",
    farmName: "HARVEST MOON",
    city: "SÃO PAULO",
    state: "SÃO PAULO",
    totalArea: 1000.0,
    arableArea: 50.15,
    vegetationArea: 10.1,
    plantedCrops: [
      {
        plantedCropId: 1
      }
    ]
  };
}).build();

export const ValidProducerWithCnpjFactory = Factory.define(Producer, () => {
  return {
    documentTypeId: CNPJ,
    documentNumber: "28.840.583/0001-88",
    producerName: "TST1",
    farmName: "HARVEST MOON",
    city: "SÃO PAULO",
    state: "SÃO PAULO",
    totalArea: 1000.0,
    arableArea: 50.15,
    vegetationArea: 10.1,
    plantedCrops: {
      plantedCropId: 1,
    },
  };
}).build();

export const InvalidProducerWithCpfFactory = Factory.define(Producer, () => {
  return {
    documentTypeId: CPF,
    documentNumber: "151.061.810-07",
    producerName: "TST1",
    farmName: "HARVEST MOON",
    city: "SÃO PAULO",
    state: "SÃO PAULO",
    totalArea: 1000.0,
    arableArea: 50.15,
    vegetationArea: 10.1,
    plantedCrops: {
      plantedCropId: 1,
    },
  };
}).build();

export const InvalidProducerWithCnpjFactory = Factory.define(Producer, () => {
  return {
    documentTypeId: CNPJ,
    documentNumber: "26.840.583/0001-88",
    producerName: "TST1",
    farmName: "HARVEST MOON",
    city: "SÃO PAULO",
    state: "SÃO PAULO",
    totalArea: 1000.0,
    arableArea: 50.15,
    vegetationArea: 10.1,
    plantedCrops: {
      plantedCropId: 1,
    },
  };
}).build();

export const InvalidProducerWithArableAreaPlusVegetationAreaGreatherThenTotalArea = Factory.define(Producer, () => {
  return {
    documentTypeId: CPF,
    documentNumber: "153.061.810-07",
    producerName: "TST1",
    farmName: "HARVEST MOON",
    city: "SÃO PAULO",
    state: "SÃO PAULO",
    totalArea: 1000.0,
    arableArea: 1050.15,
    vegetationArea: 2000.1,
    plantedCrops: {
      plantedCropId: 1,
    },
  };
}).build();
