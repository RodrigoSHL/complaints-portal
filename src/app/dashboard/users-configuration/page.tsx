import { IUser } from '@/users';
import { notFound } from 'next/navigation';
import React from 'react'
import UserManagement from '@/users/components/UserManagement';

const getUsers = async (): Promise<IUser[]> => {
  const endpoint = 'https://complaints-channel-backend-48cc8a1e296a.herokuapp.com/user';

  try {
    const response = await fetch(`${endpoint}`, {
      cache: "no-store", // Usar "no-store" para asegurar una solicitud fresca
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch complaint: ${response.status}`);
    }

    const users: IUser[] = await response.json();
    console.log('users', users)
    return users;
  } catch (error) {
    console.error("Error fetching complaint:", error);
    notFound(); // Solo llamar a notFound si ocurre un error real
  }
}


export default async function User() {

  const users = await getUsers();

  return (
    <>
      <UserManagement users={users} />
    </>
  )
}
