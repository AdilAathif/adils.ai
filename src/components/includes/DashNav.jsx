import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';

export default function DashNav() {
  const params = useParams();

  return (
    <>
        <div id='nav'>
            <header>
                <h1 className="left"><img src={require('./../assets/logo.png')} alt="favicon" /></h1>
                <ul>
                    <li><NavLink to='../'>LogOut</NavLink></li>
                    <li><span>{params.name[0]}</span></li>
                </ul>
            </header>
        </div>
        
        <Outlet />
    </>
  )
}
