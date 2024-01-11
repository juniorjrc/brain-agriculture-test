import Database from "@ioc:Adonis/Lucid/Database";
import { PlantedCropsFactory } from "Database/factories";
import test from "japa";
import supertest from "supertest";
import BrainAgricultureHttpStatus from "../../utils/httpstatus/BrainAgricultureHttpStatus";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const PLANTED_CROPS_CONTEXT = "/planted-crops";

test.group("Planted crops", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });
  test("Must get all planted crops", mustGetAllPlantedCrops);
  test("Must get planted crop by id", mustGetPlantedCropById);
  test(
    "Must return 404 when planted crop not found by id",
    mustReturnNotFoundWhenNotFoundPlantedCropById
  );
  test("Must get planted crop by name", mustGetPlantedCropByName);
  test(
    "Must return 404 when planted crop not found by name",
    mustReturnNotFoundWhenNotFoundPlantedCropByName
  );
  test("Must create an planted crop", mustCreatePlantedCrop);
  test("Must not create an planted crop when name already exists", mustNotCreatedPlantedCropWithSameName);
  test(
    "Must throw exception when plantedCropName field has more than max lenght",
    mustReturnBadRequestWhenCreatePlantedCropWithMaxLength
  );
});

async function mustGetAllPlantedCrops(assert) {
  const { body } = await supertest(BASE_URL)
    .get(PLANTED_CROPS_CONTEXT)
    .expect(BrainAgricultureHttpStatus.OK);

  assert.exists(body.plantedCrops, "Undefined planted crops");
  assert.equal(body.plantedCrops[0].plantedCropId, 1);
  assert.equal(body.plantedCrops[0].plantedCropName, "Milho verde");
}

async function mustGetPlantedCropById(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${PLANTED_CROPS_CONTEXT}/1`)
    .expect(BrainAgricultureHttpStatus.OK);

  assert.exists(body.plantedCrop, "Undefined planted crops");
  assert.equal(body.plantedCrop.plantedCropId, 1);
  assert.equal(body.plantedCrop.plantedCropName, "Milho verde");
}

async function mustReturnNotFoundWhenNotFoundPlantedCropById(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${PLANTED_CROPS_CONTEXT}/38`)
    .expect(BrainAgricultureHttpStatus.NOT_FOUND);

  assert.equal(body.code, "NOT_FOUND");
  assert.equal(body.message, "Planted crop not found");
}

async function mustGetPlantedCropByName(assert) {
  const plantedCropPayload = { plantedCropName: "Milho" };
  const { body } = await supertest(BASE_URL)
    .post(`${PLANTED_CROPS_CONTEXT}/search-by-name`)
    .send(plantedCropPayload)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.equal(body.plantedCrop[0].plantedCropName, "Milho verde");
}

async function mustReturnNotFoundWhenNotFoundPlantedCropByName(assert) {
  const plantedCropPayload = { plantedCropName: "TST" };
  const { body } = await supertest(BASE_URL)
    .post(`${PLANTED_CROPS_CONTEXT}/search-by-name`)
    .send(plantedCropPayload)
    .expect(BrainAgricultureHttpStatus.NOT_FOUND);
  assert.equal(body.code, "NOT_FOUND");
  assert.equal(body.message, "Planted crop not found");
}

async function mustCreatePlantedCrop(assert) {
  const plantedCropPayload = { plantedCropName: "Batata" };
  const { body } = await supertest(BASE_URL)
    .post(PLANTED_CROPS_CONTEXT)
    .send(plantedCropPayload)
    .expect(BrainAgricultureHttpStatus.CREATED);
  assert.exists(body.plantedCrop, "Undefined planted crop");
  assert.equal(
    body.plantedCrop.plantedCropName,
    plantedCropPayload.plantedCropName
  );
}

async function mustNotCreatedPlantedCropWithSameName(assert) {
  const plantedCropPayload = { plantedCropName: "Milho verde" };
  const { body } = await supertest(BASE_URL)
    .post(PLANTED_CROPS_CONTEXT)
    .send(plantedCropPayload)
    .expect(BrainAgricultureHttpStatus.BAD_REQUEST);
  assert.equal(body.code, "BAD_REQUEST")
}

async function mustReturnBadRequestWhenCreatePlantedCropWithMaxLength(
  assert
) {
  const { plantedCropName } = await PlantedCropsFactory.create();
  const { body } = await supertest(BASE_URL)
    .post(PLANTED_CROPS_CONTEXT)
    .send({ plantedCropName })
    .expect(BrainAgricultureHttpStatus.BAD_REQUEST);
  assert.equal(
    body.errors[0].message,
    "The plantedCropName field must have a maximum of 20 characters."
  );
}
