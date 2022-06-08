const Login = ({handleLogin,username,password,setUsername,setPassword}) => {
    return ( 
        <div className="login-form">
        <form onSubmit={handleLogin}>
        <div className="username-container">
            username
            <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} name='username'/>
        </div>
        <div className="password-container">
            password
            <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} name='password'/>
        </div>
        <button type='submit'>Login</button>
        </form>
      </div>
     );
}
 
export default Login;