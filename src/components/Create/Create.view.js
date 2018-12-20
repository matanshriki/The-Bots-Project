import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createBot } from './create.actions';
import styled from 'styled-components';
import { lighten, darken } from 'polished';


import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import { withRouter } from 'react-router-dom';



class Create extends Component {

    state = {
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        country: '',
        description: '',
        avatar: '',
        form_valid: true,
        error_msg: '',
        error_field: ''
    }

    inputChanged = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    selectCountry = (country) => {
        this.setState({ country });
    }

    hide_errors = () => {
        this.setState({ form_valid: true, error_msg: '', error_field: '' });
    }

    validate_form = () => {
        let form_valid = true;
        let error_msg = '';
        let error_field = '';

        let conclude = () => {
            this.setState({ form_valid, error_msg, error_field });
            return form_valid;
        }

        if (this.state.first_name == '') {
            form_valid = false;
            error_msg = 'First Name is required';
            error_field = 'first_name';
            return conclude();
        }
        if (this.state.last_name == '') {
            form_valid = false;
            error_msg = 'Last Name is required';
            error_field = 'last_name';
            return conclude();
        }
        if (this.state.email == '') {
            form_valid = false;
            error_msg = 'Email is required';
            error_field = 'email';
            return conclude();
        }
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (re.test(String(this.state.email).toLowerCase()) === false) {
            form_valid = false;
            error_msg = 'Email is not a valid address';
            error_field = 'email';
            return conclude();
        }
        if (this.state.description == '') {
            form_valid = false;
            error_msg = 'Description is required';
            error_field = 'description';
            return conclude();
        }
    }

    submit_new_bot = (e) => {

        //prevent page reload - default form submit behaviour 
        e.preventDefault();

        const form_valid = this.validate_form();

        //do not proceed any further if the form is not valid...
        if (form_valid === false) return;

        // extract relevant keys from props
        const { new_bot_id, doCreateBot, history } = this.props;
        //complete the new bot data
        const bot_data = {
            ...this.state,
            id: new_bot_id,
            avatar: 'https://robohash.org/ethicsunt.jpg?size=80x80&set=set1'
        }

        //remove 3 keys
        delete bot_data.form_valid
        // delete bot_data.form_valid
        delete bot_data.error_msg
        delete bot_data.error_field

        //dispacth the bot data:
        doCreateBot(bot_data);

        //redirect - use history.
        //redirect to /browse page
        console.log('matan')
        history.push('/browse');

        // this.props.doCreateBot(bot_data);
        // e.preventDefault();
    }

    render() {
        return (
            <Container>
                <Title>Create your own Bot!</Title>
                <Form>
                    <MiniTitle> Full Name</MiniTitle>
                    <Box>
                        <Input onChange={this.inputChanged} name="first_name" type="text" placeholder="First Name"
                            error_styled={this.state.error_field == 'first_name'}
                            onBlur={this.validate_form}
                            onFocus={this.hide_errors} />
                        {/* <ERROR_MSG show={(this.state.form_valid !== true)}>
                            {this.state.error_msg}
                        </ERROR_MSG> */}
                        <Space />
                        <Input onChange={this.inputChanged} name="last_name" type="text" placeholder="Last Name"
                            error_styled={this.state.error_field == 'last_name'}
                            onBlur={this.validate_form}
                            onFocus={this.hide_errors} />
                    </Box>
                    <MiniTitle> Email</MiniTitle>
                    <Input onChange={this.inputChanged} name="email" type="email" placeholder="Email"
                        error_styled={this.state.error_field == 'email'}
                        onBlur={this.validate_form}
                        onFocus={this.hide_errors} />
                    <MiniTitle> Country </MiniTitle>
                    <CountrySelect onChange={this.selectCountry} value={this.state.country} />
                    <MiniTitle> Description</MiniTitle>
                    <Description onChange={this.inputChanged} rows="6"
                        name='description' placeholder='Tell us a bit about the bot...' 
                         error_styled={this.state.error_field == 'description'}
                         onBlur={this.validate_form}
                         onFocus={this.hide_errors} />
                    <SubmitButton onClick={this.submit_new_bot}>Create Bot</SubmitButton>
                </Form>
            </Container>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        new_bot_id: state.browse.original_list.length + 1
    }
}

function mapDispatchToProps(dispatch) {
    return {
        doCreateBot: (newBot) => dispatch(createBot(newBot)),
    }
}


// export default connect(mapStateToProps, mapDispatchToProps)(Create);
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Create));

const Container = styled.div` 
    flex-direction: column;
`;

const Title = styled.h1`
    display: flex;
    justify-content: center;
    margin-bottom:2rem;
    font-weight: normal;
    font-family: 'Griffy', cursive;
    text-shadow: 2px 2px 10px rgba(71, 0, 37, .2);
    color:coral;
    font-size: 7rem;
    padding-left: 1rem;
    background: -webkit-linear-gradient(gold, coral);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top: 10rem;
`;

const MiniTitle = styled.h3`
    display: flex;
    justify-content: center;
    /* margin-bottom:2rem; */
    font-weight: normal;
    font-family: 'Griffy', cursive;
    text-shadow: 2px 2px 10px rgba(71, 0, 37, .2);
    color:coral;
    font-size: 3rem;
    padding-left: 1rem;
    background: -webkit-linear-gradient(gold, coral);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-top:8rem;
    /* color:coral; */
    /* font-size:2rem; */
    font-family:'Arial';
    margin-bottom:.5rem;
    margin-top: 1rem;
`;

const ERROR_MSG = styled.h1`
display:flex;
flex-direction: column;
    color:red;
    border:red dashed 1px;
    border-radius:6px;
    visibility: ${(props) => props.show === true ? 'visible' : 'hidden'};
    align-self: center;
    text-align:center;
    padding:.6rem;
    width:100%;
    /* margin-bottom:1rem; */
    font-size:1.6rem;
    font-family:'Arial';
`;
// const Label = styled.label`
//     margin-top:8rem;
//     /* color:coral; */
//     /* font-size:2rem; */
//     font-family:'Arial';
//     margin-bottom:.5rem;
// `;

const Input = styled.input`
    font-size:2rem;
    font-family:'Arial';
    border-radius:4px;
    padding:1rem 2rem;
    border:2px ${p => p.error_styled ? 'red' : 'transparent'} solid;
    outline:none;
    background-color:${p => p.error_styled ? lighten(.4, 'red') : 'lightgray'};
    color:${p => p.error_styled ? 'red' : 'slategray'};
    &::placeholder{
        color:${p => p.error_styled ? 'red' : 'slategray'};
    };
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        transition: background-color 5000s ease-in-out 0s;        
        -webkit-text-fill-color: slategray;
    }
    &:focus{
        border:darkgray 2px solid;
        background-color:lightgray;
        color:slategray;
    };
`;

const CountrySelect = styled(CountryDropdown)`
    font-size:2rem;
    font-family:'Arial';
    border-radius:4px;
    padding:1rem 2rem;
    border:2px transparent solid;
    outline:none;
    background-color:lightgray;
    color:slategray;
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
         transition: background-color 5000s ease-in-out 0s;
        
         -webkit-text-fill-color: slategray;
    }
    &:focus{
        border:darkgray 2px solid;
    }
`;
const Space = styled.div`
    width: 1rem;
`;
const Form = styled.form`
    /* border:cyan solid 1px; */
    width: 100%;
    padding:10rem;
    display:flex;
    flex-direction:column;
    align-items:center;
    /* min-height:70rem; */
    min-width:75rem;
    min-height:75rem;
    background: white;
    border-radius:6px;
    box-shadow: inset 0px 0px 14px 1px rgba(133,133,133,1);
    border-radius: 50%;
`;
const Box = styled.div`
    display:flex;
    
`;
const SubmitButton = styled.button`
    width: 50%;
    margin-top:2rem;
    margin-bottom:.5rem;
    outline-style: none;
    border-style: none;
    background: lightsalmon;
    text-transform: uppercase;
    color: white;
    font-size:2.2rem;
    padding: 2rem 2rem;
    border-radius: 5px;
    cursor: pointer;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    &:hover{
        background:${ darken(.1, 'lightsalmon') }
    }
 `;


const Description = styled.textarea`
    width:75%;
    font-size:2rem;
    font-family:'Arial';
    border-radius:4px;
    padding:1rem 2rem;
    border:2px ${p => p.error_styled ? 'red' : 'transparent'} solid;
    outline:none;
    background-color:${p => p.error_styled ? lighten(.4, 'red') : 'lightgray'};
    color:slategray;
    &::placeholder{
        color:${p => p.error_styled ? 'red' : 'slategray'};
    };
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
         transition: background-color 5000s ease-in-out 0s;     
         -webkit-text-fill-color: slategray;
    }
    &:focus{
        border:darkgray 2px solid;
        background-color:lightgray;
    };
`;