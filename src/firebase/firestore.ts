import dayjs from 'dayjs';
import { firestore, auth } from './index';
import { StoreExpense } from '../interfaces';
import { tagOptions } from '../components/table/tagCell';

export const addExpense = async (amount: number, date: Date) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .add({
      createdAt: firestore.FieldValue.serverTimestamp(),
      date: firestore.Timestamp.fromDate(date),
      amount,
      tag: 'その他',
    });
};

export const getExpense = async (): Promise<StoreExpense[]> => {
  const { currentUser } = auth();

  const querySnapshot = await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .orderBy('date', 'asc')
    .get();

  const expense = querySnapshot.docs
    .sort((a, b) => {
      const dateA = a.data().date.toDate();
      const dateB = b.data().date.toDate();

      if (dayjs(dateA).format('YYYY/M/D') === dayjs(dateB).format('YYYY/M/D')) {
        if (a.data().createdAt > b.data().createdAt) {
          return -1;
        }

        return 1;
      }

      if (dateA > dateB) {
        return -1;
      }

      return 1;
    })
    .map((doc) => {
      return {
        id: doc.id,
        date: doc.data().date.toDate(),
        formatedDate: dayjs(doc.data().date.toDate()).format('YYYY/M/D'),
        amount: doc.data().amount,
        tagLabel: doc.data().tag,
        tagIcon: tagOptions.filter((obj) => obj.text === doc.data().tag)[0].icon,
      };
    });

  return expense;
};

export const updateExpense = async (id: string, amount: number, date: Date, tag: string) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .doc(id)
    .update({
      date: firestore.Timestamp.fromDate(date),
      amount,
      tag,
    });
};

export const deleteExpense = async (id: string) => {
  const { currentUser } = auth();
  await firestore()
    .collection('users')
    .doc(`${currentUser?.uid}`)
    .collection('expense')
    .doc(id)
    .delete();
};
