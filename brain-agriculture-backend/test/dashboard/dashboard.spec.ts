import Database from "@ioc:Adonis/Lucid/Database";
import test from "japa";
import supertest from "supertest";
import BrainAgricultureHttpStatus from "../../utils/httpstatus/BrainAgricultureHttpStatus";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const DASHBOARD_CONTEXT = "/dashboard";

test.group("Dashboard tests", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("Must get total producers", mustGetTotalProducers);
  test("Must get total farm area", mustGetTotalFarmArea);
  test("Must get total producers by state", mustGetTotalProducersByState);
  test("Must get crops count", mustGetCropsCount);
  test("Must get land use summary", mustGetLandUseSummary);
});

async function mustGetTotalProducers(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DASHBOARD_CONTEXT}/total`)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body.totalProducers, "Total producers unregonized");
  assert.equal(body.totalProducers, 1);
}

async function mustGetTotalFarmArea(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DASHBOARD_CONTEXT}/total-farm-area`)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body.totalFarmArea, "Total farm area unregonized");
  assert.equal(body.totalFarmArea, 100);
}

async function mustGetTotalProducersByState(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DASHBOARD_CONTEXT}/total-producers-by-state`)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body[0], "Total producers by state unregonized");
  assert.equal(body[0].state, "SÃO PAULO");
  assert.equal(body[0].totalProducersByState, 1);
}

async function mustGetCropsCount(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DASHBOARD_CONTEXT}/total-crops-by-type`)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body[0], "Crops count unregonized");
  assert.equal(body[0].plantedCrop, "Milho verde");
  assert.equal(body[0].total, 1);
}

async function mustGetLandUseSummary(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DASHBOARD_CONTEXT}/land-use-summary`)
    .expect(BrainAgricultureHttpStatus.OK);
  assert.exists(body, "Land use summary unrecognized");
  assert.equal(body.totalArableArea, 25.25);
  assert.equal(body.totalVegetationArea, 10.05);
  assert.equal(body.totalLandArea, 35.3);
}
