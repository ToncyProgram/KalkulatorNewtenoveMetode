import React, { useState } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { Table, Row } from "react-native-table-component";

const App = () => {
  const [func, setFunc] = useState("");
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [finalResult, setFinalResult] = useState(null); 

  const calculate = () => {
    const eps = 1e-10; 
    let x = parseFloat(value);
    let xn = 0;
    let diff = 1;

    const f = new Function("x", `return ${func}`); 

    const newResults = [];

    while (diff > eps) {
      xn = x - f(x) / derivative(f, x); 
      diff = Math.abs(xn - x);
      x = xn;
      newResults.push(xn);
    }

    setResults(newResults);
    setFinalResult(xn); 
  };

  const derivative = (f, x) => {
    const h = 1e-8; 
    return (f(x + h) - f(x - h)) / (2 * h); 
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24 }}>Newtenova metoda tangente</Text>
      <TextInput
        style={{ borderWidth: 1, padding: 8, width: 200, marginTop: 16 }}
        placeholder="Upiši funkciju:"
        value={func}
        onChangeText={(text) => setFunc(text)}
      />
      <TextInput
        style={{ borderWidth: 1, padding: 8, width: 200, marginTop: 16 }}
        placeholder="Upiši x0:"
        value={value}
        onChangeText={(text) => setValue(text)}
      />
      <View style={{ paddingTop: 20 }}>
        <Button title="Izračunaj" onPress={calculate} />
      </View>
      <Text style={{ fontSize: 24, marginTop: 16 }}>Rezultati:</Text>
      <Table style={{ width: "80%", height: "40%", marginTop: 16 }}>
        <Row
          data={["n", "xn"]}
          style={{
            backgroundColor: "#f1f8ff",
            width: "100%",
            height: 40
          }}
          textStyle={{
            margin: 6,
            fontWeight: "bold",
            textAlign: "center"
          }}
        />
        {results.map((xn, index) => (
          <Row
            key={index}
            data={[index + 1, xn.toFixed(8)]}
            style={{
              width: "100%",
              height: 40
            }}
            textStyle={{
              margin: 6,
              textAlign: "center"
            }}
          />
        ))}
      </Table>
      {finalResult && (
        <Text style={{ fontSize: 24, marginTop: 16 }}>
          Krajnji rezultat: {finalResult.toFixed(12)}
        </Text>
      )}
    </View>
  );
};

export default App;