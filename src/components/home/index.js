import React, { useState, useEffect } from 'react'
import http from "../../http_common";


const HomePage = () => {

    const [users, setUsers] = useState([
        {
            fio: "Cинок Маслай",
            email: "vv@vv.com",
            image: "/images/vvhwjfpp.12c.jpg"
        }
    ]);

    useEffect(() => {
        http.get("api/users/all")
            .then(resp => {
                console.log(resp);
                setUsers(resp.data);
            });
       
    }, [])
    
    return (
        <div className="row">
            <h1 className="text-center">Головна сторінка</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">ФІО</th>
                        <th scope="col">Email</th>
                        <th scope="col">Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user, index) => {
                            return (
                                <tr key={index}>
                                    <td>{user.fio}</td>
                                    <td>{user.email}
                                    </td>
                           
<td>
                                        <img src={"http://localhost:15247"+user.image} alt="Самогон" width="150" />
                                    </td>
                                </tr>

                            );
                        })
                    }
                </tbody>
            </table>
            
        </div>
    );
}

export default HomePage;