import React from "react";


  
export const Account = () => {

  return (

      <div className="account"> 
        <div className="header">
          <h1 id="account">Account</h1>
        </div>
        <article className='column'>
            {/* {user?.picture && <img id="user-picture" src={user.picture} alt={user?.name} />}
            <h2>{user?.name}</h2>
            <div className="user-details">
              <p><strong>Email: </strong>{user.email}</p>
              <p><strong>Member since: </strong>{Date(user.created_at).toLocaleString()}</p>
              <p><strong>Number of Posts: </strong>#</p>
            </div> */}

            {/* <ul>
                {Object.keys(user).map((objKey, i) => <li key={i}>{objKey}: {user[objKey]}</li>)}
            </ul> */}
        </article>
      </div>
  );
};
  
 