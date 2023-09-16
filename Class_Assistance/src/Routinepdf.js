// RoutinePDF.js
import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 10,
  },
  table: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 4,
    flex: 1,
  },
});

const RoutinePDF = ({ routineData }) => {
  return (
    <PDFViewer style={{ width: '100%', height: '100vh' }}>
      <Document>
        <Page size="A4" style={styles.page}>
          <Text style={styles.title}>Weekly Routine</Text>
          <View style={styles.table}>
            {/* Render table headers */}
            <View style={styles.cell}><Text>Time</Text></View>
            <View style={styles.cell}><Text>Saturday</Text></View>
            <View style={styles.cell}><Text>Sunday</Text></View>
            <View style={styles.cell}><Text>Monday</Text></View>
            <View style={styles.cell}><Text>Tuesday</Text></View>
            <View style={styles.cell}><Text>Wednesday</Text></View>
          </View>
          {/* Render routine data */}
          {routineData.map((routine) => (
            <View style={styles.table} key={routine.time}>
              <View style={styles.cell}><Text>{routine.time}</Text></View>
              <View style={styles.cell}><Text>{routine.saturday}</Text></View>
              <View style={styles.cell}><Text>{routine.sunday}</Text></View>
              <View style={styles.cell}><Text>{routine.monday}</Text></View>
              <View style={styles.cell}><Text>{routine.tuesday}</Text></View>
              <View style={styles.cell}><Text>{routine.wednesday}</Text></View>
            </View>
          ))}
        </Page>
      </Document>
    </PDFViewer>
  );
};

export default RoutinePDF;
