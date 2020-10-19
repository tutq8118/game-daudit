import React, {useState} from 'react';
// import logo from './logo.svg';
import money from './money.jpg';

import ClickNHold from 'react-click-n-hold';


import { Select, Radio, Checkbox, notification } from 'antd';

import 'antd/dist/antd.css';
import './App.scss';

const openNotification  = placement => {
  notification.info({
    message: 'Chưa nặn đủ thời gian',
    description:
      'Hãy dí 2s trờ lên nhé!',
    placement,
  });
};

const { Option } = Select;

function AppMoney(props) {
  return (
    <div className="App-money">
      <img className="App-money__img" src={money} alt="" />
      {props.result !== 1 && (
        <ClickNHold time={1} onStart={props.start} onClickNHold={props.clickNHold} onEnd={props.end}>
          <button className="App-money__btn">Nặn</button>
        </ClickNHold>
      )}
      {props.result === 1 && <span className="App-money__serial">{props.serial}</span>}
    </div>
  );
}


function App() {

  const [mode, setMode] = useState('fast');
  const [fastMode, setFastMode] = useState(1);
  const localItems = localStorage.getItem('moneyItems')
    ? JSON.parse(localStorage.getItem('moneyItems'))
    : [ { result: 0, serial: '' },
        { result: 0, serial: '' }
      ];

  const [items, setItems] = useState(localItems);

  function handleModePicker(e) {
    setMode(e.target.value);
  }

  function handleFastModeChange(value) {
    setFastMode(value);
  }

  function handleFreedomPicker(e) {
    console.log(e);
  }
  function start(e){
    console.log('START'); 
  } 
    
  function handleEnd(item) {
    const index = items.indexOf(item);

    return (e, enough) => {
      e.stopPropagation();
      if (enough) {
        var max = 99999999;
        var min = 0;
        var radomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        var randomString = radomNumber.toString();
        var fullRandomString = randomString.padStart(8, '0');
        
        setItems([
          ...items.slice(0, index),
          {
            result: 1,
            serial: fullRandomString,
          },
          ...items.slice(index + 1),
        ]);

        const newItems = [
          ...items.slice(0, index),
          {
            result: 1,
            serial: fullRandomString,
          },
          ...items.slice(index + 1),
        ];
        localStorage.setItem('moneyItems', JSON.stringify(newItems));
        
      } else {
        openNotification('bottomRight');
        setItems([
          ...items.slice(0, index),
          {
            result: 0,
            serial: ''
          },
          ...items.slice(index + 1),
        ]);

        const newItems = [
          ...items.slice(0, index),
          {
            result: 0,
            serial: '',
          },
          ...items.slice(index + 1),
        ];
        localStorage.setItem('moneyItems', JSON.stringify(newItems));
      }
    };

  };
    
  function clickNHold(e){
    console.log('CLICK AND HOLD');  
  }

  function handleFight(e) {
    console.log(fastMode);
     var arr1 = items[0].serial.split('').map((e) => parseInt(e));
     var arr2 = items[1].serial.split('').map((e) => parseInt(e));
    switch (fastMode) {
      case 2:
        
        break;
      case 3:
        // code block
        break;
      default:
        var score1 = arr1.reduce((a, b) => a + b) % 10;
        var score2 = arr2.reduce((a, b) => a + b) % 10;
    }
    console.log(score1, score2);
  }
  function handleReset(e) {
    setItems([
      { result: 0, serial: '' },
      { result: 0, serial: '' },
    ]);
    localStorage.setItem(
      'moneyItems',
      JSON.stringify([
        { result: 0, serial: '' },
        { result: 0, serial: '' },
      ])
    );
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1>Game Đầu Đít</h1>
        <div className="App-form">
          <div className="form-group">
            <Radio.Group name="radiogroup" defaultValue="fast" onChange={handleModePicker}>
              <Radio value="fast">Chơi nhanh</Radio>
              <Radio value="freedom">Chơi tự do</Radio>
            </Radio.Group>
          </div>
          {mode === 'fast' && (
            <div className="form-group">
              <label htmlFor="">Gọi cái:</label>
              <Select className="form-select" defaultValue={1} style={{ width: 220 }} onChange={handleFastModeChange}>
                <Option value={1}>Tổng động viên</Option>
                <Option value={2}>Tổng 1, 3, 5, 7</Option>
                <Option value={3}>Tổng 2, 4, 6, 8</Option>
                <Option value={4}>Tổng các số chẵn</Option>
                <Option value={5}>Tổng các số lẻ</Option>
              </Select>
            </div>
          )}

          {mode === 'freedom' && (
            <div className="form-group">
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
              </Checkbox.Group>
              ,
            </div>
          )}
        </div>
        <div className="App-list">
          {items.map((item, index) => (
            <AppMoney key={index} result={item.result} src={money} start={start} end={handleEnd(item)} clickNHold={clickNHold} serial={item.serial} />
          ))}
        </div>
        <div className="App-action">
          <button onClick={handleFight}  className="btn">
            Chiến
          </button>
          <button onClick={handleReset}  className="btn">
            Chơi lại
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
