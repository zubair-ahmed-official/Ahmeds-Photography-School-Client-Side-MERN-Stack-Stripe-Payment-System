import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Bounce } from 'react-awesome-reveal';
import Swal from 'sweetalert2';

const AllUSers = () => {
    const { data: users = [], refetch } = useQuery(['users'],
        async () => {
            const res = await fetch('https://12th-assignment-server-side.vercel.app/users')
            return res.json();
        })

    const HandleMakeInstructor = (user) => {
        fetch(`https://12th-assignment-server-side.vercel.app/users/${user._id}`,
            {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is Instructor now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch();
                }
            })

    }
    const HandleMakeAdmin = (user) => {
        fetch(`https://12th-assignment-server-side.vercel.app/admins/${user._id}`,
            {
                method: 'PATCH'
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount) {
                    Swal.fire({
                        icon: 'success',
                        title: `${user.name} is Admin now`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                    refetch();
                }
            })

    }

    return (
        <Bounce duration={1200} ><div className='m-5 text-center'>
            <h2 className='text-2xl font-bold'>All Users</h2>
            <p className='text-xl font-bold'>Number of users: {users.length}</p>
            <div style={{ marginLeft: '200px', marginTop: '30px' }}>
                <table className="table bg-slate-800 text-lg" style={{ width: '800px' }}>
                    {/* head */}
                    <thead className='text-lg'>
                        <tr>
                            <th></th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th></th>
                            <th>&nbsp;&nbsp;Role</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(
                                u => <tr key={u._id}>
                                    <th>
                                        <label>
                                            <input type="checkbox" className="checkbox" />
                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={u.photoURL || u.image} alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>

                                        </div>
                                    </td>
                                    <td>
                                        {u.name}
                                        <br />

                                    </td>
                                    <td></td>
                                    <th>{
                                        u.role === 'admin' ? <><span style={{ color: "cyan" }}> &nbsp;&nbsp;ADMIN &nbsp;</span>  <button className="btn btn-primary btn-xs" onClick={() => HandleMakeInstructor(u)}>Make Instructor</button></> :
                                            u.role === 'instructor' ? <> <span> &nbsp;&nbsp;Instructor</span>&nbsp;&nbsp;<button className="btn btn-success btn-xs" onClick={() => HandleMakeAdmin(u)}>Make Admin</button> </> :
                                                <><button className="btn btn-primary btn-xs" onClick={() => HandleMakeInstructor(u)}>Make Instructor</button> &nbsp;&nbsp;
                                                    <button className="btn btn-success btn-xs" onClick={() => HandleMakeAdmin(u)}>Make Admin</button> </>}
                                    </th>
                                </tr>)}

                    </tbody>


                </table>
            </div>
        </div>
        </Bounce>
    );
};

export default AllUSers;