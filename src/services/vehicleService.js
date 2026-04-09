/**
 * vehicleService.js
 * Centralized Firebase Firestore access for vehicle data.
 * All import/export operations use these functions.
 */

import {
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  writeBatch,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const COLLECTION = 'vehicles';

/**
 * Fetch all vehicles from Firestore.
 * @returns {Promise<Array>} Array of vehicle objects with their Firestore doc id.
 */
export async function getVehicles() {
  const q = query(collection(db, COLLECTION), orderBy('name'));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Fetch a limited sample of vehicles (for preview).
 * @param {number} maxCount
 * @returns {Promise<Array>}
 */
export async function getVehiclesSample(maxCount = 50) {
  const q = query(collection(db, COLLECTION), orderBy('name'), limit(maxCount));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));
}

/**
 * Save (upsert) a single vehicle to Firestore.
 * @param {Object} vehicle - Must have an `id` field.
 */
export async function saveVehicle(vehicle) {
  const { id, ...data } = vehicle;
  await setDoc(doc(db, COLLECTION, id), data, { merge: true });
}

/**
 * Batch-write an array of vehicles to Firestore.
 * Firestore batches are limited to 500 operations, so we chunk them.
 * @param {Array} vehicles
 * @returns {Promise<number>} Number of vehicles written.
 */
export async function importVehicles(vehicles) {
  const BATCH_LIMIT = 400;
  let count = 0;

  for (let i = 0; i < vehicles.length; i += BATCH_LIMIT) {
    const chunk = vehicles.slice(i, i + BATCH_LIMIT);
    const batch = writeBatch(db);

    chunk.forEach((vehicle) => {
      const { id, ...data } = vehicle;
      if (!id) return; // Skip records without an id
      const ref = doc(db, COLLECTION, String(id));
      batch.set(ref, data, { merge: true });
      count++;
    });

    await batch.commit();
  }

  return count;
}

/**
 * Delete a single vehicle from Firestore.
 * @param {string} id
 */
export async function deleteVehicle(id) {
  await deleteDoc(doc(db, COLLECTION, id));
}

/**
 * Delete all vehicles in the collection.
 * Use with caution — reads all docs then deletes them in batches.
 * @returns {Promise<number>} Number of documents deleted.
 */
export async function deleteAllVehicles() {
  const snapshot = await getDocs(collection(db, COLLECTION));
  const BATCH_LIMIT = 400;
  let count = 0;

  const docs = snapshot.docs;
  for (let i = 0; i < docs.length; i += BATCH_LIMIT) {
    const chunk = docs.slice(i, i + BATCH_LIMIT);
    const batch = writeBatch(db);
    chunk.forEach((docSnap) => {
      batch.delete(docSnap.ref);
      count++;
    });
    await batch.commit();
  }

  return count;
}
