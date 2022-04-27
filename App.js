// You can use both React and React Native.
// We want to use Hooks, useEffect and useState, from React in our functional
// App component.
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";

export default function App() {
  // Initially, set isLoading to true and set up the setLoading function for
  // later changing the isLoading value.
  const [isLoading, setLoading] = useState(true);
  // Initially, set data to an empty array and set up the setData function for
  // later changing the data value to the fetched data.
  const [data, setData] = useState([]);

  // The useEffect hook is similar to the componentDidMount and
  // componentDidUpdate in class components. For our anonymoust function, we will
  // have one parameter, fetch(), and an empty function body.
  // Note that items in a Django database can be retrieved that way as well.
  // Try it out with Postman.
  useEffect(() => {
    // Pass the URL to the fetch API. 
    //NEED TO CHANGE THIS
    fetch("https://sebastianzimmeck.de/class/comp333/test-api.json")
      // Parse the response object and extract the json response that is obtained.
      .then((response) => response.json())
      // Set the empty data variable to the fetched data.
      .then((json) => setData(json))
      // Catch any errors thrown from the fetch call.
      .catch((error) => console.error(error))
      // While the data is loading, show the isLoading view below.
      // Once setLoading() sets isLoading to false, show the view with the
      // loaded data.
      .finally(() => setLoading(false));
  }, []);

  return (
    // Now the component parses the data and renders it using a FlatList component.
    <View style={{ flex: 1, padding: 24 }}>
      {/* As long as isLoading is true, show "Loading ..." */}
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        // Once it is false, show the fetched data.
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 18, color: "green", textAlign: "center" }}>
            {data.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "green",
              textAlign: "center",
              paddingBottom: 10,
            }}
          >
            Lectures:
          </Text>
          <FlatList
            data={data.lectures}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Text>{item.id + ". " + item.title}</Text>
            )}
          />
        </View>
      )}
    </View>
  );
}