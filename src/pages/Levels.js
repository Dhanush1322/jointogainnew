import React from 'react'
import '../css/Levels.css';

function Levels() {
  return (
    <section id='level' className='level-container'>
      <h1>Levels</h1>
      <div className='level-list'>
        <div className='level-1' style={{
          backgroundImage: "url('/img/Rectangle 160.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white" /* Ensure text is visible on the image */
        }}>
          <div className='button'>
            <h2>Level 1</h2>
          </div>
          <h3>Return : 3%</h3>
          <h3>Minimum Investment:<br />5 lakh</h3>
          <h3>Login Requirement: 2 Logins</h3>
        </div>
        <div className='level-1' style={{
          backgroundImage: "url('/img/Rectangle 161.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white" /* Ensure text is visible on the image */
        }}>
          <div className='button'>
            <h2>Level 2</h2>
          </div>
          <h3>Return : 2%</h3>
          <h3>Minimum Investment:<br />5 lakh</h3>
          <h3>Login Requirement: 2 Logins</h3>
        </div>
        <div className='level-1' style={{
          backgroundImage: "url('/img/Rectangle 162.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white" /* Ensure text is visible on the image */
        }}>
          <div className='button'>
            <h2>Level 3</h2>
          </div>
          <h3>Return : 1%</h3>
          <h3>Minimum Investment:<br />10 lakh</h3>
          <h3>Login Requirement: 2 Logins</h3>
        </div>
      </div>
      <div className='level-list1' >
        <div className='level-1' style={{
          backgroundImage: "url('/img/Rectangle 163.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white" /* Ensure text is visible on the image */
        }}>
          <div className='button'>
            <h2>Level 4</h2>
          </div>
          <h3>Return : 0.50%</h3>
          <h3>Minimum Investment:<br />5 lakh</h3>
          <h3>Login Requirement: 10 Logins</h3>
        </div>
        <div className='level-1' style={{
          backgroundImage: "url('/img/Rectangle 164.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          padding: "20px",
          borderRadius: "10px",
          textAlign: "center",
          color: "white" /* Ensure text is visible on the image */
        }}>
          <div className='button'>
            <h2>Level 5</h2>
          </div>
          <h3>Return : 0.25%</h3>
          <h3>Minimum Investment:<br />5 lakh</h3>
          <h3>Login Requirement: 14 Logins</h3>
        </div>

      </div>

    </section>
  )
}

export default Levels