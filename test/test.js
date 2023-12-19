const chai = require('chai');
const expect = chai.expect;
const { MongoClient } = require('mongodb');

describe('**MongoDB CRUD Database Test', () => {
  let client;

  beforeEach(async () => {
    client = await MongoClient.connect('mongodb://localhost:27017');
  });

  afterEach(async () => {
    await client.close();
  });

  it('should create a new database & insert and item', async () => {
    console.log(`*CREATE documents Start`);
    const result_create = await client.db("test_database").collection("test").insertOne({ name: "business", postcode: 6000}) // Create a new item
    console.log(result_create);
    console.log(`*Created New listing created with the following id: ${result_create.insertedId}`);
    console.log(`*CREATE documents Complete`);
    expect(result_create).to.contain({ acknowledged: true }); // Number of created documents
  });

it('should read documents from the collection', async () => {
    console.log(`*READ documents Start`);
    const cursor = client.db("test_database").collection("test").find( { name: "business", postcode: 6000} );
    const results_read = await cursor.toArray();
    console.log(results_read);
    console.log(` #results: ${results_read.length}`);
    console.log(`*READ documents Complete`);
    expect(results_read.length).to.be.above(0); // Number of read documents
  });

  it('should UPDATE documents from the collection', async () => {
    console.log(`*UPDATE documents Start`);
    const results_update = await client.db("test_database").collection("test").updateOne( { name: "business" } , { $set: { name: "business", postcode: 2000} }, { upsert: true } );
    console.log(`${results_update.matchedCount} document(s) matched the UPDATE query criteria.`);
    console.log(`${results_update.modifiedCount} document(s) was/were updated as items already exists.`);
    console.log(results_update);
    console.log(`*UPDATE documents Complete`);
    expect(results_update).to.contain({ matchedCount: 1 }); // Number of updated documents
  });


  it('should DELETE documents from the collection', async () => {
    console.log(`*DELETE documents Start`);
    const delresult = await client.db("test_database").collection("test").deleteOne({ name: "business"});
    console.log(delresult);
    console.log(`${delresult.deletedCount} document(s) was/were deleted.`);
    console.log(`*DELETE documents Complete`);
    expect(delresult).to.contain({ acknowledged: true }); // Number of deleted documents
  });

  //client.db("test_database").dropDatabase(); // Clear existing test database


});



