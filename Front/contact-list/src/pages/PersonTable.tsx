import React, { useState } from "react";

function PersonTable() {

    return (
      <div className="PersonTable">
        <h2>Eventos</h2>
        <hr/>

        <div className="form-inline">
          <div className="form-group mb-2">
            <label className="mr-2">Filtro: </label>
            <input
            type="text"
            className="form-control mr-2"
            placeholder="Buscar"
            />
          </div>
        </div>

        <table className="table table-striped">
        <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Tema</th>
              <th>Local</th>
              <th>Data</th>
              <th>Qtd. Pessoas</th>
              <th>Lote</th>
              <th>Opções</th>
            </tr>
          </thead>
        </table>
      </div>
    );
  }
  
  export default PersonTable;