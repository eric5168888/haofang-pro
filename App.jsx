import React, { useState, useEffect } from "react";
import { Building2, Users, Calendar, Calculator, KeyRound, Phone, Plus, CheckCircle2, Search } from "lucide-react";

export default function App() {
  const [tab, setTab] = useState("listings");
  const [search, setSearch] = useState("");
  const [listings, setListings] = useState(() => {
    const s = localStorage.getItem("hf_listings");
    return s ? JSON.parse(s) : [
      { id: 1, title: "左營高鐵・景觀三房平車", area: "高雄市左營區重愛路", price: 1880, size: 46.5, rooms: "3房2廳2衛", status: "專任委託", owner: "陳先生", phone: "0912-345-678" },
      { id: 2, title: "鳳山文山特區・帝王座向大四房", area: "高雄市鳳山區文衡路", price: 2450, size: 58.2, rooms: "4房2廳2衛", status: "一般委託", owner: "林小姐", phone: "0928-888-168" },
      { id: 3, title: "農十六美術館・豪宅首排雙平車", area: "高雄市鼓山區美術東二路", price: 3980, size: 78.0, rooms: "4房2廳3衛", status: "專任委託", owner: "張董事長", phone: "0933-111-222" }
    ];
  });
  const [rentals, setRentals] = useState(() => {
    const s = localStorage.getItem("hf_rentals");
    return s ? JSON.parse(s) : [
      { id: 1, title: "左營高鐵・溫馨兩房含管平車", tenant: "王小明", phone: "0955-123-456", rent: 26000, paid: true, tag: "300億租金補貼", elec: "4520度" },
      { id: 2, title: "鳳山文山・全新未住正三房", tenant: "李美玲", phone: "0966-789-012", rent: 32000, paid: false, tag: "社宅包租代管", elec: "1280度" }
    ];
  });
  const [clients, setClients] = useState(() => {
    const s = localStorage.getItem("hf_clients");
    return s ? JSON.parse(s) : [
      { id: 1, name: "吳醫師 (買方)", budget: "2500萬內", pref: "左營/鼓山 3~4房平車", phone: "0911-222-333", note: "本週六下午可看屋" },
      { id: 2, name: "蔡經理 (買方)", budget: "1800萬內", pref: "鳳山文山特區 3房", phone: "0922-444-555", note: "自備款充足" }
    ];
  });
  const [schedules, setSchedules] = useState(() => {
    const s = localStorage.getItem("hf_schedules");
    return s ? JSON.parse(s) : [
      { id: 1, time: "今日 14:30", title: "帶看：左營高鐵景觀三房", done: false, note: "警衛室換證借鑰匙" },
      { id: 2, time: "今日 19:00", title: "收斡旋：鳳山文山大四房", done: false, note: "準備實價登錄行情表" }
    ];
  });
  const [loanPrice, setLoanPrice] = useState(1880);
  const [loanRatio, setLoanRatio] = useState(80);
  const [loanYears, setLoanYears] = useState(40);
  const [loanRate, setLoanRate] = useState(1.775);

  useEffect(() => { localStorage.setItem("hf_listings", JSON.stringify(listings)); }, [listings]);
  useEffect(() => { localStorage.setItem("hf_rentals", JSON.stringify(rentals)); }, [rentals]);
  useEffect(() => { localStorage.setItem("hf_clients", JSON.stringify(clients)); }, [clients]);
  useEffect(() => { localStorage.setItem("hf_schedules", JSON.stringify(schedules)); }, [schedules]);

  const loanAmount = Math.round(loanPrice * (loanRatio / 100));
  const mRate = (loanRate / 100) / 12;
  const months = loanYears * 12;
  const monthlyPay = Math.round((loanAmount * 10000 * mRate * Math.pow(1 + mRate, months)) / (Math.pow(1 + mRate, months) - 1));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-24 font-sans">
      <header className="bg-slate-900 border-b border-slate-800 px-4 py-3 sticky top-0 z-20 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-500 p-2 rounded-xl text-slate-950 font-bold"><Building2 size={20} /></div>
          <div><h1 className="font-bold text-base text-white">好房通 Pro</h1><p className="text-xs text-emerald-400">台灣房仲與包租代管行動系統</p></div>
        </div>
        <span className="text-xs bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded-full">本機自動儲存</span>
      </header>
      <main className="p-4 max-w-md mx-auto space-y-4">
        {tab === "listings" && (
          <>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3 text-slate-400" />
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜尋案名或路段..." className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-sm text-white" />
              </div>
              <button onClick={() => { const title = prompt("輸入案名："); const price = Number(prompt("開價(萬)：", "1980")); if (title && price) setListings([{ id: Date.now(), title, area: "高雄市", price, size: 45, rooms: "3房2廳2衛", status: "專任委託", owner: "屋主", phone: "0900-000-000" }, ...listings]); }} className="bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-sm flex items-center gap-1"><Plus size={16}/>新增</button>
            </div>
            {listings.filter(l => l.title.includes(search) || l.area.includes(search)).map(item => (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-start"><span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full">{item.status}</span><span className="text-lg font-extrabold text-amber-400">{item.price} 萬</span></div>
                <h3 className="font-bold text-white text-base">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.area} ｜ {item.size}坪 ｜ {item.rooms}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-slate-300">屋主：{item.owner}</span>
                  <div className="flex gap-2">
                    <a href={"tel:" + item.phone} className="bg-slate-800 px-2.5 py-1.5 rounded-lg text-emerald-400 flex items-center gap-1"><Phone size={12}/>撥號</a>
                    <button onClick={() => { setLoanPrice(item.price); setTab("calc"); }} className="bg-amber-500/20 text-amber-300 px-2.5 py-1.5 rounded-lg">試算</button>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
        {tab === "rentals" && (
          <>
            <div className="bg-slate-900 border border-emerald-700/40 rounded-2xl p-4 flex justify-between items-center">
              <div><p className="text-xs text-emerald-300">本月應收租金總額</p><p className="text-2xl font-extrabold text-white mt-1">NT$ {rentals.reduce((s, r) => s + r.rent, 0).toLocaleString()}</p></div>
              <button onClick={() => { const title = prompt("出租案名："); const tenant = prompt("房客姓名："); const rent = Number(prompt("月租金：", "25000")); if (title && tenant) setRentals([{ id: Date.now(), title, tenant, phone: "0912-000-000", rent, paid: false, tag: "300億租金補貼", elec: "1000度" }, ...rentals]); }} className="bg-emerald-500 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs flex items-center gap-1"><Plus size={14}/>新增租約</button>
            </div>
            {rentals.map(r => (
              <div key={r.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between"><span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full">{r.tag}</span><span className={"text-xs font-bold px-2 py-0.5 rounded-full " + (r.paid ? "bg-emerald-500/20 text-emerald-300" : "bg-rose-500/20 text-rose-300")}>{r.paid ? "已收租" : "待催繳"}</span></div>
                <h3 className="font-bold text-white">{r.title}</h3>
                <p className="text-xs text-slate-400">租客：{r.tenant} ｜ 月租：NT$ {r.rent.toLocaleString()} ｜ 電錶：{r.elec}</p>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                  <a href={"tel:" + r.phone} className="text-xs text-emerald-400 flex items-center gap-1"><Phone size={12}/>聯絡房客</a>
                  <button onClick={() => setRentals(rentals.map(x => x.id === r.id ? { ...x, paid: !x.paid } : x))} className="bg-emerald-500 text-slate-950 font-bold px-3 py-1 rounded-lg text-xs">{r.paid ? "改為未收" : "確認收租"}</button>
                </div>
              </div>
            ))}
          </>
        )}
        {tab === "clients" && (
          <>
            <button onClick={() => { const name = prompt("客戶稱呼："); const budget = prompt("預算：", "2000萬內"); const pref = prompt("需求：", "三房平車"); if (name) setClients([{ id: Date.now(), name, budget, pref, phone: "0900-111-222", note: "新開發客戶" }, ...clients]); }} className="w-full bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-sm flex justify-center items-center gap-1"><Plus size={16}/>新增客戶</button>
            {clients.map(c => (
              <div key={c.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between"><h3 className="font-bold text-white">{c.name}</h3><span className="text-xs text-amber-400 font-bold">預算：{c.budget}</span></div>
                <p className="text-xs text-emerald-300">需求：{c.pref}</p>
                <p className="text-xs text-slate-400 bg-slate-950 p-2 rounded-lg">{c.note}</p>
              </div>
            ))}
          </>
        )}
        {tab === "schedule" && (
          <>
            <button onClick={() => { const time = prompt("時間：", "明日 15:00"); const title = prompt("行程：", "帶看三房"); if (time && title) setSchedules([{ id: Date.now(), time, title, done: false, note: "準時出發" }, ...schedules]); }} className="w-full bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-sm flex justify-center items-center gap-1"><Plus size={16}/>新增行程</button>
            {schedules.map(s => (
              <div key={s.id} onClick={() => setSchedules(schedules.map(x => x.id === s.id ? { ...x, done: !x.done } : x))} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex justify-between items-center cursor-pointer">
                <div><span className="text-xs text-amber-400 font-bold">{s.time}</span><h3 className={"font-bold text-white " + (s.done ? "line-through opacity-50" : "")}>{s.title}</h3><p className="text-xs text-slate-400">{s.note}</p></div>
                <CheckCircle2 className={s.done ? "text-emerald-400" : "text-slate-600"} />
              </div>
            ))}
          </>
        )}
        {tab === "calc" && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4">
            <h2 className="font-bold text-white text-base">房貸與稅費試算</h2>
            <div className="flex gap-2">
              <button onClick={() => { setLoanRate(1.775); setLoanYears(40); setLoanRatio(80); }} className="flex-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 py-1.5 rounded-lg text-xs font-bold">新青安 1.775%</button>
              <button onClick={() => { setLoanRate(2.185); setLoanYears(30); setLoanRatio(80); }} className="flex-1 bg-slate-800 text-slate-300 py-1.5 rounded-lg text-xs">首購 2.185%</button>
            </div>
            <div className="space-y-2 text-xs">
              <label className="block text-slate-400">總價（萬）：<input type="number" value={loanPrice} onChange={e => setLoanPrice(Number(e.target.value))} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-sm" /></label>
              <label className="block text-slate-400">成數（%）：<input type="number" value={loanRatio} onChange={e => setLoanRatio(Number(e.target.value))} className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-white text-sm" /></label>
            </div>
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <div className="flex justify-between text-xs"><span className="text-slate-400">頭期款：</span><span className="font-bold text-white">{loanPrice - loanAmount} 萬</span></div>
              <div className="flex justify-between text-xs"><span className="text-slate-400">貸款總額：</span><span className="font-bold text-emerald-400">{loanAmount} 萬</span></div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-baseline"><span className="text-xs text-slate-300">月付金：</span><span className="text-xl font-extrabold text-amber-400">NT$ {monthlyPay.toLocaleString()} /月</span></div>
            </div>
          </div>
        )}
      </main>
      <nav className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around py-2 z-30">
        {[{ id: "listings", icon: Building2, label: "買賣物件" }, { id: "rentals", icon: KeyRound, label: "租賃管理" }, { id: "clients", icon: Users, label: "客戶名單" }, { id: "schedule", icon: Calendar, label: "帶看行程" }, { id: "calc", icon: Calculator, label: "房貸試算" }].map(item => {
          const Icon = item.icon;
          return (<button key={item.id} onClick={() => setTab(item.id)} className={"flex flex-col items-center gap-1 text-xs " + (tab === item.id ? "text-emerald-400 font-bold" : "text-slate-400")}><Icon size={18} /><span>{item.label}</span></button>);
        })}
      </nav>
    </div>
  );
}
