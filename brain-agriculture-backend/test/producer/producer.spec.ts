import Database from "@ioc:Adonis/Lucid/Database";
import test from "japa";
import supertest from "supertest";
import BrainAgricultureHttpStatus from "../../utils/httpstatus/BrainAgricultureHttpStatus";
import {
  InvalidProducerWithArableAreaPlusVegetationAreaGreatherThenTotalArea,
  InvalidProducerWithCnpjFactory,
  InvalidProducerWithCpfFactory,
  ValidProducerWithCnpjFactory,
  ValidProducerWithCpfFactory,
} from "Database/factories";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const PRODUCER_CONTEXT = "/producer";

test.group("Producers tests", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });
  test("Must get all producers", mustGetAllProducers);
  test("Must get producer by id", mustGetProducerById);
  test("Must create valid producer with CPF", mustCreateValidProducerWithCpf);
  test("Must create valid producer with CNPJ", mustCreateValidProducerWithCnpj);
  test(
    "Must not create producer with invalid CPF",
    mustNotCreateProducerWithInvalidCpf
  );
  test(
    "Must not create producer with invalid CNPJ",
    mustNotCreateProducerWithInvalidCnpj
  );
  test(
    "Must not create producer with arable area plus vegetation area greather then total area",
    mustNotCreateProducerWithArableAreaPlusVegetationAreaGreatherThenTotalArea
  );
});

async function mustGetAllProducers(assert) {
  const { body } = await supertest(BASE_URL)
    .get(PRODUCER_CONTEXT)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body.producers, "Undefined producers");
  assert.equal(body.producers[0].documentNumber, "999.999.999-99");
}

async function mustGetProducerById(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${PRODUCER_CONTEXT}/1`)
    .expect(BrainAgricultureHttpStatus.OK);

  assert.exists(body.producer, "Undefined producer");
  assert.equal(body.producer.producerId, 1);
}

async function mustCreateValidProducerWithCpf(assert) {
  const {
    documentTypeId,
    documentNumber,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  } = await ValidProducerWithCpfFactory.create();

  const { body } = await supertest(BASE_URL)
    .post(PRODUCER_CONTEXT)
    .send({
      documentTypeId,
      documentNumber,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    })
    .expect(BrainAgricultureHttpStatus.CREATED);
  assert.exists(body.producer, "Undefined producer");
  assert.equal(body.producer.producerName, producerName);
}

async function mustCreateValidProducerWithCnpj(assert) {
  const {
    documentTypeId,
    documentNumber,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  } = await ValidProducerWithCnpjFactory.create();

  const { body } = await supertest(BASE_URL)
    .post(PRODUCER_CONTEXT)
    .send({
      documentTypeId,
      documentNumber,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    })
    .expect(BrainAgricultureHttpStatus.CREATED);
  assert.exists(body.producer, "Undefined producer");
  assert.equal(body.producer.producerName, producerName);
}

async function mustNotCreateProducerWithInvalidCpf(assert) {
  const {
    documentTypeId,
    documentNumber,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  } = await InvalidProducerWithCpfFactory.create();

  const { body } = await supertest(BASE_URL)
    .post(PRODUCER_CONTEXT)
    .send({
      documentTypeId,
      documentNumber,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    })
    .expect(BrainAgricultureHttpStatus.BAD_REQUEST);
  assert.equal(body.errors[0].message, "Invalid CPF");
}

async function mustNotCreateProducerWithInvalidCnpj(assert) {
  const {
    documentTypeId,
    documentNumber,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  } = await InvalidProducerWithCnpjFactory.create();

  const { body } = await supertest(BASE_URL)
    .post(PRODUCER_CONTEXT)
    .send({
      documentTypeId,
      documentNumber,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    })
    .expect(BrainAgricultureHttpStatus.BAD_REQUEST);
  assert.equal(body.errors[0].message, "Invalid CNPJ");
}

async function mustNotCreateProducerWithArableAreaPlusVegetationAreaGreatherThenTotalArea(
  assert
) {
  const {
    documentTypeId,
    documentNumber,
    producerName,
    farmName,
    city,
    state,
    totalArea,
    arableArea,
    vegetationArea,
    plantedCrops,
  } =
    await InvalidProducerWithArableAreaPlusVegetationAreaGreatherThenTotalArea.create();

  const { body } = await supertest(BASE_URL)
    .post(PRODUCER_CONTEXT)
    .send({
      documentTypeId,
      documentNumber,
      producerName,
      farmName,
      city,
      state,
      totalArea,
      arableArea,
      vegetationArea,
      plantedCrops,
    })
    .expect(BrainAgricultureHttpStatus.BAD_REQUEST);
  assert.equal(
    body.errors[0].message,
    "The sum of the arable area plus the vegetable area is greater than the total area in hectares"
  );
}
