import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const Protected = (props) => {

    let { Component, Component2, requiredRole } = props
    const navigate = useNavigate()
    console.log("role", requiredRole)
    const [userData, setUserData] = useState();
    // useEffect(() => {
    //     const islogin = JSON.parse(localStorage.getItem("userData"))
    //     if (!islogin) {
    //         navigate("/login")
    //     }
    //     console.log("islogin",islogin.data.role)
    //     if ( islogin.data.role !== requiredRole) {
    //          navigate("/login")
    //       }
    // }, [])
    useEffect(() => {

        const isLogin = JSON.parse(localStorage.getItem("userData"));
        setUserData(isLogin);

        if (!isLogin) {
            navigate("/login");
        } else {
            if (isLogin.data.role !== requiredRole) {
                navigate("/login");
                localStorage.removeItem("userData")
            }
        }
    }, [requiredRole, navigate]);

    if (!userData) {
        return null;
    }
    // requiredRole="user"
    return (
        <>
            <Component />
            {Component2 ? (<Component2 />) : (<></>)}
        </>

    )
}

export default Protected