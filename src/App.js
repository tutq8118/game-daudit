import React, {useState} from 'react';
// import logo from './logo.svg';
import money from './money.jpg';

import ClickNHold from 'react-click-n-hold';


import { Select, Radio, Checkbox, Button, notification } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';

const openNotification  = placement => {
  notification.info({
    message: 'Chưa đủ công lực',
    description:
      'Hãy dí 2s trờ lên nhóe!',
    placement,
  });
};

const { Option } = Select;


function App() {

  const [mode, setMode] = useState('fast');
  const [result, setResult] = useState(undefined);
  const [resultLoading, setResultLoading] = useState(undefined);

  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function start(e){
    console.log('START'); 
  } 
    
  function end(e, enough){
    console.log('END');
        if (enough) {
          setResult(1);
          var max = 99999999;
          var min = 0;
          var radomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
          var randomString  =  radomNumber.toString();
          var fullRandomString = randomString.padStart(8, "0");
          console.log(fullRandomString);
        } else {
          openNotification('bottomRight');
          setResult(0);
        }
  } 
    
  function clickNHold(e){
    console.log('CLICK AND HOLD');  
  } 

  function handleModePicker(e) {
    setMode(e.target.value);
  }
  
  function handleFreedomPicker(e) {
    console.log(e);
  }

  return (
    <div className="App">
      <div className="App-header">
          <h1>Game Đầu Đít</h1>
          <div className="App-form">
              <div className="form-group">
              <Radio.Group name="radiogroup" defaultValue='fast' onChange={handleModePicker}>
                <Radio value="fast">Chơi nhanh</Radio>
                <Radio value="freedom">Chơi tự do</Radio>
              </Radio.Group>
              </div>
              {mode === 'fast' && <div className="form-group">
                <label htmlFor="">Gọi cái:</label>
                <Select className="form-select" defaultValue={1} style={{ width: 220 }} onChange={handleChange}>
                  <Option value={1}>Tổng động viên</Option>
                  <Option value={2}>Tổng 1, 3, 5, 7</Option>
                  <Option value={3}>Tổng 2, 4, 6, 8</Option>
                  <Option value={4}>Tổng các số chẵn</Option>
                  <Option value={5}>Tổng các số lẻ</Option>
                </Select>
              </div>}
              
              {mode === 'freedom' && <div className="form-group">
                <label htmlFor="">Chọn tổng các số thứ tự:</label>
                <Checkbox.Group style={{ width: '100%' }} onChange={handleFreedomPicker}>
                  <Checkbox value={1}>1</Checkbox>
                  <Checkbox value={2}>2</Checkbox>
                  <Checkbox value={3}>3</Checkbox>
                  <Checkbox value={4}>4</Checkbox>
                  <Checkbox value={5}>5</Checkbox>
                  <Checkbox value={6}>6</Checkbox>
                  <Checkbox value={7}>7</Checkbox>
                  <Checkbox value={8}>8</Checkbox>
                </Checkbox.Group>,
              </div>}
          </div>
          <div className="App-money">
            <img className = "App-money__img"  src = {money} alt = "" />
            {result !== 1 && <ClickNHold
              time={2} 
              onStart={start} 
              onClickNHold={clickNHold} 
              onEnd={end} > 
                <button className = "App-money__btn">Nặn</button>
            </ClickNHold>}  
            {result === 1 && <span className = "App-money__serial"></span>}
          </div>
      </div>
    </div>
  );
}

export default App;
