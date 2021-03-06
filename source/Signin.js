import React, {Component} from 'react'
import DayPicker, {DateUtils} from "react-day-picker"
import {Checkbox, InputGroup, NonIdealState, Toaster, Radio, RadioGroup, Switch} from "@blueprintjs/core"
import {DateInput} from '@blueprintjs/datetime'
import 'moment/locale/ko'
import MomentLocaleUtils from 'react-day-picker/moment'
import {getMeta, isExistUsername, signin} from './actions'
import {host} from './config'

class Signin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      agreeLaw: false,
      agreeTerms: false,
      agreeAll: false,
      isEmailAlert: false,
      isUsernameTooShortAlert: false,
      isUsernameAlreadyExistAlert: false,
      isNameAlert: false,
      isUsernameAlert: false,
      isPasswordAlert: false,
      isPasswordConfirmAlert: false,
      isPhonenumberAlert: false,
      isSuccess: false,
      isStudentNumberAlert: false,
      isDepartmentAlert: false,
      username: '',
      last_name: '',
      password: '',
      phone_number: '',
      department: "",
      email: "",
      student_number: 0,
      date_of_birth: new Date(new Date().setFullYear(new Date().getFullYear() - 20)),
      meta: [],
    }
  }
  componentWillMount() {
    getMeta()
    .then(meta => this.setState({meta}))
    this.toaster = Toaster.create()
  }
  onNameBlur(event) {
    var last_name = event.target.value.toString()
    if(!last_name.trim()) {
      this.setState({isNameAlert: true})
    }
    else {
      this.setState({isNameAlert: false})
      this.setState({last_name})
    }
  }
  onUsernameBlur(event) {
    var username = event.target.value.toString()
    if(!username.trim()) {
      this.setState({isUsernameAlert: true})
    }
    else {
      this.setState({isUsernameAlert: false})
      this.setState({username})
    }
  }
  onPasswordBlur(event) {
    var password = event.target.value.toString()
    if(!password || password.length < 8){
      this.setState({isPasswordAlert: true})
    }
    else {
      this.setState({isPasswordAlert: false})
      this.setState({password})
    }
  }
  onPasswordConfirmBlur(event) {
    var passwordConfirm = event.target.value.toString()
    if(!passwordConfirm.trim() || passwordConfirm !== this.state.password) {
      this.setState({isPasswordConfirmAlert: true})
    }
    else {
      this.setState({isPasswordConfirmAlert: false})
    }
  }
  onEmailBlur(event) {
    var email = event.target.value.toString()
    if(email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)){
      this.setState({isEmailAlert: false})
      this.setState({email})
    }
    else {
      this.setState({isEmailAlert: true})
    }
  }
  onStudentNumberBlur(event) {
    var student_number = event.target.value.toString()
    if(student_number.match(/^[0-9]{10}$/)){
      this.setState({isStudentNumberAlert: false})
      this.setState({student_number})
    }
    else {
      this.setState({isStudentNumberAlert: true})
    }
  }
  onDepartmentBlur(event) {
    var department = event.target.value.toString()
    if(!department.trim()){
      this.setState({isDepartmentAlert: true})
    }
    else {
      this.setState({isDepartmentAlert: false})
      this.setState({department})
    }
  }
  onPhonenumberBlur(event) {
    var phone_number = event.target.value.toString()
    if(phone_number.match(/^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/)){
      this.setState({isPhonenumberAlert: false})
      this.setState({phone_number})
    }
    else {
      this.setState({isPhonenumberAlert: true})
    }
  }
  onSubmitClick(event) {
    signin(this.state)
    .then(res => {
      if (res === 204)  { //create success
        this.setState({isSuccess: true})
      }
      else {            //fail
        this.toaster.show({
          className: "toaster-fail",
          timeout: 1000,
          message: "입력값이 올바르지 않습니다"
        })
      }
    })
  }

  handleUsernameChange(e) {
    if(e.target.value.length < 6) {
      this.setState({isUsernameTooShortAlert: true})
      this.setState({isUsernameAlreadyExistAlert: false})
    }
    else {
      this.setState({isUsernameTooShortAlert: false})
      isExistUsername({username: e.target.value})
      .then(res => {
        res.message ?
        this.setState({isUsernameAlreadyExistAlert: true}) :
        this.setState({isUsernameAlreadyExistAlert: false})
      })
    }
  }

  render() {
    const description = <span className="text-muted"> 하루 내에 당신의 계정이 만들어집니다 </span>
    const meta = this.state.meta
    return (
      <div className="club-page">
        { this.state.isSuccess ? 
          <div className="container-600 join-success">
            <NonIdealState
              visual="confirm"
              title="신청되었습니다"
              description={description}
            />
          </div> :
          <div className="club-join-container">
            <h1 className="club-join-title"> CIA 가입하기 </h1>
            {this.state.agreeAll ?
            <div className="club-join-content">
              <div className="club-join">
                <div className="club-join-form"> {/* ----------name  */ }
                  <strong> 이름 </strong>
                  <input type="text" 
                    placeholder="당신은 19기이니 [19기 ㅇㅇㅇ] <- 이렇게 써요"
                    className={this.state.isNameAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onNameBlur.bind(this)} />
                  {this.state.isNameAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      이 칸은 비울 수 없습니다 </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- username  */ }
                  <strong> 아이디 </strong>
                  <input type="text" 
                    onChange={e => this.handleUsernameChange(e)}
                    className={this.state.isUsernameAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onUsernameBlur.bind(this)} />
                  {this.state.isUsernameAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      이 칸은 비울 수 없습니다 </small> </span> }
                  {this.state.isUsernameAlreadyExistAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      중복된 아이디입니다 </small> </span> }
                  {this.state.isUsernameTooShortAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      너무 짧습니다(6자 이상) </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- password  */ }
                  <strong> 패스워드 </strong>
                  <input type="password"
                    className={this.state.isPasswordAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onPasswordBlur.bind(this)} />
                  {this.state.isPasswordAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      너무 짧습니다 (8자이상) </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- password confirm */ }
                  <strong> 패스워드 (재입력) </strong>
                  <input type="password"
                    className={this.state.isPasswordConfirmAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                      onBlur={this.onPasswordConfirmBlur.bind(this)} />
                  {this.state.isPasswordConfirmAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                       일치하지 않습니다</small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- phone number */ }
                  <strong> 학과(부) </strong>
                  <input type="text"
                    className={this.state.isDepartmentAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                    onBlur={this.onDepartmentBlur.bind(this)} />
                  {this.state.isDepartmentAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      이 칸은 비울 수 없습니다 </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- phone number */ }
                  <strong> 학번 </strong>
                  <input type="text"
                    className={this.state.isStudentNumberAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                    onBlur={this.onStudentNumberBlur.bind(this)} />
                  {this.state.isStudentNumberAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      인식할 수 없는 학번입니다 </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- email */ }
                  <strong> E-mail </strong>
                  <input type="text"
                    className={this.state.isEmailNumberAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                    onBlur={this.onEmailBlur.bind(this)} />
                  {this.state.isEmailAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      인식할 수 없는 이메일입니다. </small> </span> }
                </div> 
                <div className="club-join-form"> {/* ---------- phone number */ }
                  <strong> 연락처 </strong>
                  <input type="text"
                    className={this.state.isPhonenumberAlert ? "club-join-input pt-input pt-intent-danger" : "club-join-input pt-input .modifier" }
                    placeholder="010-0000-0000"
                    onBlur={this.onPhonenumberBlur.bind(this)} />
                  {this.state.isPhonenumberAlert && 
                    <span role="alert" className="club-join-input-error"> <small>
                      인식할 수 없는 번호입니다(010-0000-0000) </small> </span> }
                </div>
                <div className="club-join-form"> {/* ---------- birthday confirm */ }
                  <strong> 생일 </strong>
                  <DateInput
                    onChange={ date_of_birth => this.setState({date_of_birth})}
                    locale="ko"
                    closeOnSelection={true}
                    disabled={false}
                    format="YYYYMMDD"
                    openOnFocus={true}
                    defaultValue={this.state.date_of_birth}
                    minDate={new Date(new Date().setFullYear(new Date().getFullYear() - 40))}
                    maxDate={new Date(new Date().setFullYear(new Date().getFullYear() - 17))}
                  />
                </div>
                <div className="club-join-form">
                  <button type="button" 
                    className="pt-button club-join-input pt-intent-primary .modifier"
                    onClick={this.onSubmitClick.bind(this)}> 
                    환영해요 </button>
                </div>
               </div>
               <div className="club-side-content">
                <img src={`${host}/static/rmt.png`} height="595.5px"/>
               </div>
             </div>
              :
              <div className="agree">
                <div className="agree-box">
                  <Checkbox 
                  checked={this.state.agreeLaw}
                  onChange={e => this.setState({agreeLaw: !this.state.agreeLaw})}
                  className='pt-large'>
                    <h5> C.I.A. 회칙 동의(필수) </h5>
                  </Checkbox>
                  <div className="agree-text">
                    {
                    meta.filter(e => e.name === 'law')
                    .map(e => e.value)
                    }
                  </div>
                </div>
                <div className="agree-box">
                  <Checkbox 
                  checked={this.state.agreeTerms}
                  onChange={e => this.setState({agreeTerms: !this.state.agreeTerms})}
                  className='pt-large'>
                    <h5> 개인정보 수집 및 이용에 대한 안내(필수) </h5>
                  </Checkbox>
                  <div className="agree-text">
                    {
                    meta.filter(e => e.name === 'terms')
                    .map(e => e.value)
                    }
                  </div>
                </div>
                  <button type="button" className="pt-button pt-intent-success float-right"
                    onClick={() => this.state.agreeLaw && this.state.agreeTerms && this.setState({agreeAll: true})}
                    disabled={!(this.state.agreeLaw && this.state.agreeTerms)}
                  >
                  동의합니다
                  <span className="pt-icon-standard pt-icon-arrow-right pt-align-right"> </span>
                  </button>
              </div>
              }
           </div>
         }
      </div>
  )
  }
}

Signin.contextTypes = {
  router: React.PropTypes.object
}

export default Signin
