
import { useState } from 'react';
import './css/App.css';

function TotalRecord({ records }) { // 사용자와 컴퓨터의 총 전적을 볼 수 있는 부분
  const win = records.filter(record => record.result === "승리").length;
  const draw = records.filter(record => record.result === "무승부").length;
  const lose = records.filter(record => record.result === "패배").length;
  let content;
  if (win > lose) {
    content = '당신은 가위바위보의 신입니다.';
  } else if (win === lose) {
    content = '한번만 더 이기면...!';
  } else if (win < lose) {
    content = '컴퓨터를 이기기 어렵죠…ㅠㅠ';
  }
  return (
    <article className='record-container'>
      <h2>총 전적</h2>
      <ul className='record-list'>
        <li>
          <h3>승리</h3>
          <span>{win}</span>
        </li>
        <li>
          <h3>무승부</h3>
          <span>{draw}</span>
        </li>
        <li>
          <h3>패배</h3>
          <span>{lose}</span>
        </li>
      </ul>
      <p className='result-content'>{content}</p>
    </article >
  )
}

function RecordList({ records }) { // 대결 결과
  return (
    <ul>
      {records.map((record, index) => (
        <li key={index} className='record-item'>
          <h3>{record.result}</h3>
          <p><small>유저</small><br />{record.user}</p>
          <span>VS</span>
          <p><small>컴퓨터</small><br />{record.computer}</p>
        </li>
      ))
      }
    </ul >
  );
}

function App() {
  const [userInput, setUserInput] = useState('');
  const [records, setRecords] = useState([
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "패배", user: "가위", computer: "보" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "패배", user: "가위", computer: "보" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "패배", user: "가위", computer: "보" },
    { result: "패배", user: "가위", computer: "바위" },
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "패배", user: "가위", computer: "바위" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "패배", user: "가위", computer: "보" },
    { result: "승리", user: "보", computer: "가위" },
    { result: "무승부", user: "바위", computer: "바위" },
    { result: "패배", user: "가위", computer: "바위" },
  ]);

  const onSubmit = (e) => {
    e.preventDefault();

    const rsp = {
      가위: '가위',
      바위: '바위',
      보: '보'
    }

    // input 값이 빈 값이거나 || '가위','바위','보'가 아닌경우
    if (userInput === '' || !rsp[userInput]) {
      alert('값을 입력하세요.(가위or바위or보)');
      setUserInput('');
      return
    }

    const computerInput = ['가위', '바위', '보'][Math.floor(Math.random() * 3)];

    // let result;
    // if (userInput === computerInput) {
    //   result = '무승부';
    // } else if ((userInput === '가위' && computerInput === '바위') ||
    //   (userInput === '바위' && computerInput === '보') ||
    //   (userInput === '보' && computerInput === '가위')) {
    //   result = '패배';
    // } else {
    //   result = '승리';
    // }

    let result = userInput === computerInput ? '무승부' :
      (userInput === '가위' && computerInput === '바위') ||
        (userInput === '바위' && computerInput === '보') ||
        (userInput === '보' && computerInput === '가위') ?
        '패배' : '승리';

    setRecords([
      { // 새 항목 추가
        result: result,
        user: userInput,
        computer: computerInput
      },
      ...records// 기존 배열의 모든 항목에
    ])

    setUserInput('');

  }

  return (
    <div className='wrap'>
      <header>
        <h1>가위바위보 게임</h1>
      </header>
      <div>
        <section>
          <form onSubmit={onSubmit}>
            <input
              id='userInput'
              className='user-input'
              type='text'
              placeholder='가위or바위or보 입력하세요.'
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
            />
            <button>대결</button>
          </form>
        </section>
        <TotalRecord records={records} />
        <RecordList records={records} />
      </div>
    </div>
  );
}

export default App;
