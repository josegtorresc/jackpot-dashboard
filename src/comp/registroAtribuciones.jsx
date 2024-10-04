function RegistroAtribuciones({ dailyAtributionsData }) {
  return (
    <div>
      {Object.entries(dailyAtributionsData).map(([date, data]) => (
        <div key={date}>
          <h3>{date}</h3>
          <p>Total Atribuciones: ${data.totalAttributions.toFixed(1)}</p>
          <p>Total Operaciones: {data.operations}</p>
        </div>
      ))}
    </div>
  );
}

export default RegistroAtribuciones;
