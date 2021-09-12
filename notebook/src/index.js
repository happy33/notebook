import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

class Notebook extends React.Component{
  state={
    events:[{id:"1",title:"买菜",content:"鸡翅",index:"1"}],
    add : false,
    finaldata : [{id:"1",title:"买菜",content:"鸡翅",index:"1"}]
  }

  handleAddEvent = () => {
    this.setState({
      add : !this.state.add
    })
  }

  //新增展示数据
  saveMsg = data => {
    var newData = {id : Math.random().toFixed(2),title : data.title, content : data.content, index : data.index}
    var oldData = this.state.events
    if(oldData.length === 0){
      this.setState({
        events : [newData]
      })
    }else{
      newData = [newData,...oldData]
      newData.sort(
        (a,b) => {
          if(a.index >= b.index){
            return -1
          }
          return 0
        }
      )
      this.setState({
        events : newData,
        add : false,
        finaldata : newData
      })
    }
  }
  //筛选展示数据
  updateMsg = data => {
    this.setState({
      finaldata : data
    })
  }

  render(){
    return(
      <div id="app">
        <h2>备忘录</h2>
        <div id="nav">
          {
            (this.state.add)?
            <button id="createBtn" onClick={this.handleAddEvent}>-</button>
            
            :<button id="createBtn" onClick={this.handleAddEvent}>+</button>
          }
          {
            (this.state.add)?
            <Addnote saveMsg={this.saveMsg}/>
            :null
          }
          <Search data={this.state.events} updateMsg={this.updateMsg}/>
        </div>
        <Shownote data={this.state.finaldata}/>
      </div>
    )
  }
}

//展示备忘录
class Shownote extends React.Component{
  render(){
    return(
      <div id="showArea">
        {
          this.props.data.map(
            item => {
              return(
              <div id="everynote" key={item.id}>
                <div id="title"><b>{item.title}</b></div>
                <div id="index"><b>emergency:{item.index}</b></div>
                <div id="content">{item.content}</div>
              </div>
              )
            }
          )
        }
      </div>
    )
  }
}

//添加一个备忘录
class Addnote extends React.Component{
  state={
    title : '',
    content : '',
    index : ''
  }

  handleInput = e => {
    var statename = e.target.name
    var value = e.target.value
    this.setState({
      [statename] : value
    })
  }

  submit = () => {
    console.log(this.state)
    if(isNaN(this.state.index) || this.state.index === '' || this.state.index > 9 || this.state.index < 1){
      alert("请输入1~9的数字")
    }else{
      if(this.state.title === ''){
        alert("请输入标题")
      }else{
        if(this.state.content === ''){
          alert("请输入备注")
        }else{
          this.props.saveMsg(this.state)
        }
      }
    }
  }

  render(){
    return(
      <div id="addArea">
        <p>添加一个备忘录</p>
        <input  id="inputtitle" name="title" value={this.state.title} placeholder="请输入标题" onChange={this.handleInput}></input>
        <input id="inputcontent" name="content" value={this.state.content} placeholder="请输入备注" onChange={this.handleInput}></input>
        <input id="inputindex" name="index" value={this.state.index} placeholder="请输入优先级1~9" onChange={this.handleInput}></input>
        <button id="addBtn" onClick={this.submit}>提交</button>
      </div>
    )
  }

}

//筛选备忘录
class Search extends React.Component{
  state={
    consition : '',
    checkData : []
  }

  handleInput = e => {
    this.setState({
      consition : e.target.value
    })
  }

  check = () => {
    var all = this.props.data
    var zip = this.state.consition
    var id = []
    var checkData = []
    if(zip === null){
      checkData = all
    }else{
      for(var i = 0; i < all.length; i++){
        if(all[i].title.search(zip) !== -1){
          id.push(i)
        }else{
          if(all[i].content.search(zip) !== -1){
            id.push(i)
          }else{
            continue
          }
        }
      }
      for(var j = 0; j < id.length; j++){
        checkData.push(all[id[j]])
      }
      this.setState({
        checkData : checkData
      })
    }
    this.props.updateMsg(checkData)
  }

  render(){
    return(
      <div id="searchArea ">
        <input id="inputCondition" value={this.state.condition} onChange={this.handleInput} placeholder="请输入要筛选的内容，默认为全部"></input>
        <button id="checkBtn" onClick={this.check}>check</button>
      </div>
    )
  }
}

ReactDOM.render(<Notebook/>,document.getElementById("root"))