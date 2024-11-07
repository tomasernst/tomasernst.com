import React from 'react';
import './BucketList.css';

const bucketListItems = [
  { text: "Learn German", completed: false },
  { text: "Live abroad for at least a year", completed: false },
  { text: "Train and run for a triathlon", completed: false },
  { text: "Eat Chinese food in China", completed: false },
  { text: "Become a parent", completed: false },
  { text: "Eat sushi in Japan", completed: true },
  { text: "Camp in Japan", completed: true },
  { text: "Fly a plane", completed: false },
  { text: "Learn to snowboard", completed: false },
  { text: "Eat at a Michelin star restaurant", completed: false },
  { text: "Run a Marathon", completed: false },
  { text: "Read at least [Redacted] books from here on out", completed: false },
  { text: "Travel Southeast Asia (Alone, with friends or with my siblings)", completed: false },
  { text: "Torres del Paine", completed: true },
  { text: "Climb Great Wall of China", completed: false },
  { text: "Watch a game at Santiago Bernabéu", completed: false },
  { text: "Have a salad from a garden I planted", completed: false },
  { text: "Invite my mom on a trip somewhere", completed: false },
  { text: "Start a company", completed: false },
  { text: "Make my dad proud", completed: false },
  { text: "Scuba Dive", completed: true },
  { text: "Travel outside the country with friends", completed: true },
  { text: "Visit Mongolia", completed: false },
  { text: "Hike the South of Chile alone", completed: false },
  { text: "See auroras", completed: false },
  { text: "Visit at least 100 countries. [x/100]", completed: false },
  { text: "Hike to Everest Base Camp", completed: false },
  { text: "Zero Gravity", completed: false },
  { text: "Bungee Jumping", completed: false },
  { text: "Skydiving", completed: false },
  { text: "Train a new sport officially", completed: false },
  { text: "Get my motorcycle license", completed: false },
  { text: "Master degree", completed: false },
  { text: "Get my own web domain", completed: false },
  { text: "Sleeping outdoors without a tent or sleeping bag", completed: true },
  { text: "Swim on a remote beach in Australia", completed: false },
  { text: "Being in a movie/commercial as an extra", completed: false },
  { text: "Sleep on a train overnight", completed: false },
  { text: "Skiing in Hokkaido", completed: false },
  { text: "Visit Korea", completed: false },
  { text: "Sail a ship alone or with friends", completed: false },
  { text: "Mount Rishiri", completed: false },
  { text: "Ice bath on Iceland", completed: false }
];

const BucketList: React.FC = () => {
  return (
    <div className="bucket-list">
      <h1 className="bucket-list-title">My Bucket List</h1>
      <ul className="bucket-list-items">
        {bucketListItems.map((item, index) => (
          <li key={index} className={`bucket-list-item ${item.completed ? 'completed' : ''}`}>
            {item.completed ? '✔️' : '❌'} {index + 1}. {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BucketList;
