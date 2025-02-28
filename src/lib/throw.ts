'use server';

export async function throwAction(msg = "Error") {
  console.log("about to throw", msg);
  throw new Error(msg);
}
