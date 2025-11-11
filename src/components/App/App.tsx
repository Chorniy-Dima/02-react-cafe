import css from './App.module.css';
import CafeInfo from '../CafeInfo/CafeInfo.tsx';
import VoteOptions from '../VoteOptions/VoteOptions.tsx';
import VoteStats from '../VoteStats/VoteStats.tsx';
import Notification from '../Notification/Notification.tsx';
import { useState } from 'react';
import type { Votes } from '../../types/votes.ts';
import type { VoteType } from '../../types/votes.ts';

export default function App() {
  const [values, setValues] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });
  
  const handleVote = (type: VoteType) => {
    setValues({
      ...values,
      [type]: values[type] + 1,
    });
  };

  const resetVotes = () => {
    setValues({
      good: 0,
      neutral: 0,
      bad: 0
    })
  };

  const totalVotes = values.good + values.neutral + values.bad;

  const positiveRate = totalVotes
    ? Math.round((values.good / totalVotes) * 100)
    : 0;
  
  return (
    <>
      <div className={css.app}>
        <CafeInfo />
        <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes? true: false} />
        {totalVotes > 0 && <VoteStats votes={values} totalVotes={totalVotes} positiveRate={positiveRate} />}
        {totalVotes == 0 && <Notification/>}
      </div>
    </>
  )
}
