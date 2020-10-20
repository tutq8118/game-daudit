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
      'Hãy nhấn và giữ 2s trờ lên nhé!',
    placement,
  });
};

const { Option } = Select;

function AppMoney(props) {
  return (
    <div className={props.result === 'win' ? 'App-money App-money--win' : props.result === 'draw' ? 'App-money App-money--draw' : props.result === 'lose' ? 'App-money App-money--lose' : 'App-money'}>
      <figure className={props.serial ? 'App-money__img App-money__img--generated' : 'App-money__img'}>
        <img src={money} alt="" />
      </figure>
      {!props.serial && (
        <ClickNHold time={1} onStart={props.start} onClickNHold={props.clickNHold} onEnd={props.end}>
          <button className="App-money__btn">
            <span>Nặn</span>
          </button>
        </ClickNHold>
      )}
      {props.serial && <span className="App-money__serial">{props.serial}</span>}
      {props.result !== '' && <strong className="App-money__score">{props.score}</strong>}
    </div>
  );
}


function App() {

  const [order, setOrder] = useState('asc');
  const [mode, setMode] = useState('fast');
  const [fastMode, setFastMode] = useState(1);
  const [freeMode, setFreeMode] = useState([1, 2, 3]);
  const localItems = localStorage.getItem('moneyItems')
    ? JSON.parse(localStorage.getItem('moneyItems'))
    : [ { serial: '', score: '', result: '' },
        { serial: '', score: '', result: '' }
      ];

  const [items, setItems] = useState(localItems);

  function handleModePicker(e) {
    setMode(e.target.value);
  }
  
  function handleOrderPicker(e) {
    setOrder(e.target.value);
  }

  function handleFastModeChange(value) {
    setFastMode(value);
  }

  function handleFreedomPicker(value) {
    setFreeMode(value);
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

        var arr = fullRandomString.split('').map((e) => parseInt(e));
        var score = 0;
       
        if (mode === 'fast') {
          switch (fastMode) {
            case 2:
              score = arr.filter((e, i) => i % 2 === 0).reduce((a, b) => a + b) % 10;
              break;
            case 3:
              score = arr.filter((e, i) => i % 2 === 1).reduce((a, b) => a + b) % 10;
              break;
            case 4:
              score = arr.filter((e, i) => e % 2 === 0).reduce((a, b) => a + b) % 10;
              break;
            case 5:
              score = arr.filter((e, i) => e % 2 === 1).reduce((a, b) => a + b) % 10;
              break;
            default:
              score = arr.reduce((a, b) => a + b) % 10;
          }
        } else {
          var totalScore = 0;
          for (const i of freeMode) {
            totalScore = totalScore + arr[i - 1];
          }
          score = totalScore % 10;
        }

        if (score === 0) {
          score = 10;
        }
        
        setItems([
          ...items.slice(0, index),
          {
            serial: fullRandomString,
            score: score,
            result: ''
          },
          ...items.slice(index + 1),
        ]);

        const newItems = [
          ...items.slice(0, index),
          {
            serial: fullRandomString,
            score: score,
            result: ''
          },
          ...items.slice(index + 1),
        ];
        localStorage.setItem('moneyItems', JSON.stringify(newItems));
        
      } else {
        openNotification('bottomRight');
      }
    };

  };
    
  function clickNHold(e){
    console.log('CLICK AND HOLD');  
  }

  function handleFight(e) {
    var score1 = items[0].score;
    var score2 = items[1].score;

    if (score1 === '' || score2 === '') return;
    if (order === 'asc') {
      setItems([
        { ...items[0], score: score1, result: score1 > score2 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
        { ...items[1], score: score2, result: score2 > score1 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
      ]);
      localStorage.setItem(
        'moneyItems',
        JSON.stringify([
          { ...items[0], score: score1, result: score1 > score2 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
          { ...items[1], score: score2, result: score2 > score1 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
        ])
      );
    } else {
      setItems([
        { ...items[0], score: score1, result: score1 < score2 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
        { ...items[1], score: score2, result: score2 < score1 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
      ]);
      localStorage.setItem(
        'moneyItems',
        JSON.stringify([
          { ...items[0], score: score1, result: score1 < score2 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
          { ...items[1], score: score2, result: score2 < score1 ? 'win' : score1 === score2 ? 'draw' : 'lose' },
        ])
      );
    }
  }
  function handleReset(e) {
    setItems([
      { serial: '', score: '', result: '' },
      { serial: '', score: '', result: '' },
    ]);
    localStorage.setItem(
      'moneyItems',
      JSON.stringify([
        { serial: '', score: '', result: '' },
        { serial: '', score: '', result: '' },
      ])
    );
    setOrder('asc');
    setMode('fast');
    setFastMode(1);
  }

  return (
    <div className="App">
      <div className="App-header">
        <h1 className="App-logo">Game Đầu Đít</h1>
        {(items[0].score !== '' || items[1].score !== '') && (
          <div className="App-rule">
            <strong>Gọi cái:</strong>
            <span>{mode === 'fast' && fastMode === 1 ? 'Tổng động viên' : mode === 'fast' && fastMode === 2 ? 'Tổng 1, 3, 5, 7' : mode === 'fast' && fastMode === 3 ? 'Tổng 2, 4, 6, 8' : mode === 'fast' && fastMode === 4 ? 'Tổng các số chẵn' : mode === 'fast' && fastMode === 5 ? 'Tổng các số lẻ' : `Tổng các số thứ tự [${freeMode}]`}</span>
            <span>{order === 'asc' ? 'To ăn' : 'Bé ăn'}</span>
          </div>
        )}
        {items[0].score === '' && items[1].score === '' && (
          <div className="App-form">
            <div className="form-group">
              <Radio.Group name="radiogroup" defaultValue={order} onChange={handleOrderPicker}>
                <Radio value="asc">To ăn</Radio>
                <Radio value="desc">Bé ăn</Radio>
              </Radio.Group>
            </div>
            <div className="form-group">
              <Radio.Group name="radiogroup" defaultValue={mode} onChange={handleModePicker}>
                <Radio value="fast">Chơi nhanh</Radio>
                <Radio value="freedom">Chơi tự do</Radio>
              </Radio.Group>
            </div>
            {mode === 'fast' && (
              <div className="form-group">
                <label htmlFor="">Gọi cái:</label>
                <Select className="form-select" defaultValue={fastMode} style={{ width: 220 }} onChange={handleFastModeChange}>
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
                <Checkbox.Group style={{ width: '100%' }} onChange={handleFreedomPicker} defaultValue={freeMode}>
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
        )}

        <div className="App-list">
          {items.map((item, index) => (
            <AppMoney key={index} src={money} start={start} end={handleEnd(item)} clickNHold={clickNHold} serial={item.serial} score={item.score} result={item.result} />
          ))}
        </div>
        <div className="App-action">
          {(items[0].score !== '' || items[1].score !== '') && (
            <button onClick={handleReset} className="ant-btn ant-btn-dangerous">
              <span>Chơi lại</span>
            </button>
          )}

          {items[0].result === '' && items[1].result === '' && items[0].score !== '' && items[1].score !== '' && (
            <button onClick={handleFight} className="ant-btn ant-btn-primary ant-btn-background-ghost">
              <span>Chiến</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
