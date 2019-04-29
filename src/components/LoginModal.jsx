import React from 'react';

const LoginModal = (props) => {
    const handleClick = () => {
        let email = document.getElementById("email").value; 
        let password = document.getElementById("password").value; 
        document.querySelector('#loginModal').modal('hide')
        props.handleLogin(email, password); 

        document.getElementById("email").value = "";
        document.getElementById("password").value = "";    
    }

    return (
        <div class="modal fade" id="loginModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Login</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form>
                        <input type="email" class="form-control" id="email" placeholder="Email"></input>
                        <input type="password" class="form-control" id="password" placeholder="Password"></input>
                    </form>
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary" onClick={handleClick}>Login</button>
                </div>
            </div>
            </div>
        </div>
    )
}

export default LoginModal;

