import React, { useState } from 'react';
import usePaymentHistory from '../hooks/usePaymentHistory';
import { Bounce } from 'react-awesome-reveal';

const PaymentHistory = () => {

    const [myPaymentHistory] = usePaymentHistory();

    const sortedData = myPaymentHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    return (
        <Bounce duration={1500}><div className='m-5 text-center text-slate-300'>
            <h2 className='text-2xl font-bold'>Payment History</h2>
            <p className='text-xl font-bold'>Number of Payment: {myPaymentHistory.length}</p>
            {/* <button onClick={sortTableData}>Sort</button> */}
            <div style={{ marginLeft: '100px', marginTop: '30px' }}>
                <table className="table bg-slate-800 text-lg" style={{ width: '1000px' }} >
                    <thead className='text-xl text-slate-300'>
                        <tr>
                            <th></th>
                            <th>Class Name</th>
                            <th>Transaction Id</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            sortedData.map(
                                (u, i) => <tr key={u._id}>
                                    <td>{i + 1}.</td>
                                    <td>{u.cname}</td>
                                    <td>{u.transactionId}</td>
                                    <td>{u.price} BDT</td>
                                    <td>{u.date}</td>
                                </tr>)}
                    </tbody>
                </table>
            </div>
        </div></Bounce>
    );
};

export default PaymentHistory;