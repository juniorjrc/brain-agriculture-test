import Database from "@ioc:Adonis/Lucid/Database";
import BrainAgricultureHttpStatus from "../../utils/httpstatus/BrainAgricultureHttpStatus";
import test from "japa";
import supertest from "supertest";

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`;
const DOCUMENT_TYPE_CONTEXT = "/document-type";

test.group("Document type", (group) => {
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction();
  });
  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction();
  });

  test("Must get all document types", mustGetAllDocumentTypes);
  test("Must get document type by id", mustGetDocumentTypeById);
});

async function mustGetAllDocumentTypes(assert) {
  const { body } = await supertest(BASE_URL)
    .get(DOCUMENT_TYPE_CONTEXT)
    .expect(BrainAgricultureHttpStatus.OK);

  assert.exists(body.documentTypes, "Undefined document types");
  assert.equal(body.documentTypes[0].documentTypeId, 2);
  assert.equal(body.documentTypes[0].documentName, "CNPJ");
}

async function mustGetDocumentTypeById(assert) {
  const { body } = await supertest(BASE_URL)
    .get(`${DOCUMENT_TYPE_CONTEXT}/1`)
    .expect(BrainAgricultureHttpStatus.OK);

  assert.exists(body.documentType, "Undefined document type");
  assert.equal(body.documentType.documentTypeId, 1);
  assert.equal(body.documentType.documentName, "CPF");
}
