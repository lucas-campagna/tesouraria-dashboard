---
theme: dashboard
title: Resultados Gerais de Entrada e Saída
toc: false
---

# Resultados Gerais de Entrada e Saída ⚖️

```jsx
import LoadBalanceteButton from "./components/LoadBalanceteButton.js";
import {Card, Grid} from "./components/Basic.js";
const months = FileAttachment("./data/months.json").json();
```

```jsx
const balancetes = Mutable(JSON.parse(localStorage.getItem('balancetes')) ?? []);
display(<LoadBalanceteButton
  text='Carregar Balancetes'
  style={{
    fontSize: '1.2rem',
    background: 'blue',
    color: 'white',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '5px'
  }}
  onData={data => {
      localStorage.setItem('balancetes', JSON.stringify(data));
      balancetes.value = data;
    }
  }
/>)
const clearBalancetes = () => {
  balancetes.value = [];
  localStorage.removeItem('balancetes')
}
```

```jsx
display(<button onClick={clearBalancetes}>Limpar balancetes salvos</button>)
```

<!-- Inputs.button('Limpar balancetes salvos', {reduce: clearBalancetes}) -->

<!-- ```jsx
const contasDeGatos = Array.from(new Set(balancetes.filter(({categoria}) => !categoria.startsWith('RECEITA')).map(({nome}) => nome)))
const gastosFixos = []
display(
  <div style={{maxHeight: '120px', maxWidth: '100vw', overflowY: 'scroll', display: 'flex', }}>
    {contasDeGatos.map(nome => 
      <div>
        <input type="checkbox"/>
        <label style={{whiteSpace: 'nowrap'}}>{nome}</label>
      </div>
    )}
  </div>
)
``` -->


```jsx
const format = ({date}) => {
  console.log(date)
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  return months[month]?.slice(0,3) + '/' + (year.toString() ?? '00')?.slice(2)
}
const getLower = (field) => (prev, cur) => prev[field] < cur[field] ? prev : cur
const getHigher = (field) => (prev, cur) => prev[field] > cur[field] ? prev : cur
const categoriasSaida = []
const first = balancetes.reduce(getLower('date'), balancetes[0]) ?? {}
const last = balancetes.reduce(getHigher('date'), balancetes[0]) ?? {}
const input = Object.entries(balancetes.reduce((acc, {categoria, valor, date}) => ({...acc, [date]: (acc[date] ?? 0) + (categoria.startsWith('RECEITA') ? (valor ?? 0) : 0)}), {})).map(([date, value]) => ({date, value}));
const output = Object.entries(balancetes.reduce((acc, {categoria, valor, date}) => ({...acc, [date]: (acc[date] ?? 0) + (!categoria.startsWith('RECEITA') ? (valor ?? 0) : 0)}), {})).map(([date, value]) => ({date, value}));
// const outputFixed = Object.entries(balancetes.reduce((acc, {nome, valor, date}) => ({...acc, [date]: (acc[date] ?? 0) + (gastosFixos.includes(nome) ? (valor ?? 0) : 0)}), {})).map(([date, value]) => ({date, value}));
const inputSum = input.reduce((acc, {value}) => acc + value, 0);
const outputSum = output.reduce((acc, {value}) => acc + value, 0);
const nMonths = [...balancetes.reduce((acc, {date}) => acc.add(date), new Set())].length
const avgInput = inputSum / nMonths;
const avgOutput = outputSum / nMonths;
display(
  <Grid size={3}>
    <Card>
      <h2>Histórico</h2>
      <span class="big" style={{color:'gray'}}>{format(first)} - {format(last)}</span>
    </Card>
    <Card>
      <h2>Entrada média mensal</h2>
      <span class="big" style={{color:'green'}}>R$ {avgInput.toFixed(2)}</span>
    </Card>
    <Card>
      <h2>Saída média mensal</h2>
      <span class="big" style={{color:'red'}}>R$ {avgOutput.toFixed(2)}</span>
    </Card>
</Grid>
)
```

```js
const buildGraficoEntradasSaidas = ({data, ...props}) => resize((width) => Plot.plot({
  ...props,
  width,
  color: {scheme: "BuRd", legend: true},
  x: {axis: false},
  fx: {transform: d => new Date(parseInt(d)), axis: 'bottom'},
  y: {grid: true, label: "R$"},
  marks: [
    Plot.barY(data, {x: "tipo", fx: 'date', y: 'value', fill: 'tipo'}),
  ]
}))
```

<div class="grid grid-cols-1">
  <div class="card">

```js
buildGraficoEntradasSaidas({
  data:[
    ...input.map(e => ({...e, tipo: 'Entrada'})),
    ...output.map(e => ({...e, tipo: 'Saída'})),
  ].sort(({date}) => new Date(date)),
  title: "Entradas e Saídas Totais",
  subtitle: "Mensal total",
})
```

  </div>


  <!-- <div class="card">

```js
buildGraficoEntradasSaidas({
  data: [
    ...input.map(e => ({...e, tipo: 'Entrada'})),
    ...outputFixed.map(e => ({...e, tipo: 'Saída'})),
  ].sort(({date}) => new Date(date)),
  title: "Entradas e Saídas Fixas",
  subtitle: "Mensal total",
})
``` -->

  </div>

  
</div>




<!-- 
```js
balancetes
```
 -->
