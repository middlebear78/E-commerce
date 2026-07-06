// Seeds the admin user into the ecom-uri database.
// The MongoDB image runs this automatically ONLY on a fresh (empty) data volume,
// so admin access is restored on any machine (Mac or Linux) with no manual steps.
// upsert + $setOnInsert makes it idempotent: it never clobbers an existing user.

db = db.getSiblingDB("ecom-uri");

db.users.updateOne(
  { email: "urisham@gmail.com" },
  {
    $setOnInsert: {
      _id: ObjectId("676c66fa2e61f3810614cdfd"),
      name: "urisham",
      email: "urisham@gmail.com",
      role: "admin",
      cart: [],
      createdAt: new Date("2024-12-25T20:11:38.415Z"),
      updatedAt: new Date("2024-12-25T20:16:48.102Z"),
      __v: 0,
    },
  },
  { upsert: true }
);

print("Seeded admin user urisham@gmail.com into ecom-uri");
