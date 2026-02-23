"use client"; // 서버가 아닌 브라우저에서 돌아가는 코드 선언

// 리액트 핵심기능 Hook 두가지 가져옴
import { useEffect, useState } from "react";

export default function Home() {
  // 데이터를 담을 틀 생성 (상태 관리)
  // routines는 실제 데이터고, setRoutines는 데이터를 바구니에 넣는 함수
  const [routines, setRoutines] = useState([]);
  const [expenses, setExpenses] = useState([]);

// 부수 효과 처리: 페이지가 처음 화면에 나타날 때 한번만 실행
useEffect(() => {
  fetch("http://localhost:8000/routines")
  .then(res => res.json()) // 응답받은 데이터를 자바스크립트 객체(json)로 변환
  .then(data => setRoutines(data)); // 변환된 데이터를 routines 바구니에 저장

  // 가계부도 동일하게 요청
  fetch("http://localhost:8000/expenses")
  .then(res => res.json())
  .then(data => setExpenses(data));
}, []); // 이 빈 배열은 처음 로딩 시 한번만 실행하라는 뜻

// 화면에 그려질 HTML 구조
return (
  <div className="p-10 font-sans space-y-8">
    {/* 루틴 섹션 */}
    <section>
      <h2 className="text-xl font-bold border-b pb-2 mb-4">🔥 오늘 할 일</h2>
      {/* map함수: routine 배열 안에 있는 개수만큼 반복해서 아래 HTML을 생성 */}
      {routines.map((r: any) => (
        <div key={r.id} className="p-3 border rounded-md mb-2 bg-gray-50">
         ✅ {r.title}
        </div>
      ))}
    </section>
    
    {/* 가계부 섹션 */}
    <section>
      <h2 className="text-xl font-bold border-b pb-2 mb-4">💰 지출 내역</h2>
      {expenses.map((e: any) => (
        <div key={e.id} className="p-3 border rounded-md mb-2 bg-red-50 text-red-700">
          {/* toLocalString(): 숫자에 콤마 찍어주는 함수 */}
          💸 {e.description}: {Number(e.amount).toLocaleString()}원
        </div>
      ))}
    </section>
  </div>
)

}