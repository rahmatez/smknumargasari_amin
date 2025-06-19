import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
// import { convertDateFormat } from "@/lib/helper";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColNo: {
    width: "10%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColNama: {
    width: "40%",
    borderStyle: "solid",
    textAlign: "left",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    paddingVertical: 4,
  },
  tableColKode: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  tableColStock: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  // tableColCate: {
  //   width: "30%",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderTopWidth: 0,
  //   display: "flex",
  //   flexDirection: "column",
  //   gap: 3,
  //   paddingVertical: 4,
  // },
  // tableColUpdate: {
  //   width: "25%",
  //   borderStyle: "solid",
  //   borderWidth: 1,
  //   borderLeftWidth: 0,
  //   borderTopWidth: 0,
  // },
  tableCell: {
    margin: "auto",
    marginVertical: 5,
    fontSize: 10,
  },
  tableCellCate: {
    fontSize: 10,
    textAlign: "center",
  },
  italic: {
    fontStyle: "italic",
  },
});

const PDFDocument = ({ data, title }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 20,
            display: "flex",
            gap: 25,
            flexDirection: "row",
            alignItems: "center",
            borderBottom: "1px solid lightgray",
          }}
        >
          <Image
            src="/logo_smk_maarif.png"
            style={{ width: 80, height: 80 }}
          />
          <div style={{ display: "flex", gap: 5 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              SMK Ma'arif Nu Margasari{" "}
            </Text>
            <Text style={{ fontSize: 10 }}>
              Alamat: JL.Raya Selatan Margasari, Kec. Margasari, Kabupaten Tegal{" "}
            </Text>
            <Text style={{ fontSize: 10 }}>Provinsi: Jawa Tengah 52463</Text>
            <Text style={{ fontSize: 10 }}>Negara: Indonesia</Text>
          </div>
        </View>
        <hr />
        <View style={styles.section}>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", textAlign: "center" }}
          >
            Daftar Nilai Hasil {title}
          </Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <View style={styles.tableColNo}>
                <Text style={styles.tableCell}>No</Text>
              </View>
              <View style={styles.tableColNama}>
                <Text style={styles.tableCell}>Nama</Text>
              </View>
              <View style={styles.tableColKode}>
                <Text style={styles.tableCell}>Status</Text>
              </View>
              <View style={styles.tableColStock}>
                <Text style={styles.tableCell}>Nilai</Text>
              </View>
              {/* <View style={styles.tableColCate}>
              <Text style={styles.tableCell}>Category</Text>
            </View>
            <View style={styles.tableColUpdate}>
              <Text style={styles.tableCell}>Last Update</Text>
            </View> */}
            </View>
            {data?.length > 0 &&
              data?.map((item, index) => (
                <View style={styles.tableRow} key={index}>
                  <View style={styles.tableColNo}>
                    <Text style={styles.tableCell}>{index + 1}</Text>
                  </View>
                  <View style={styles.tableColNama}>
                    <Text style={styles.tableCellCate}>{item?.nama}</Text>
                  </View>
                  <View style={styles.tableColKode}>
                    <Text style={styles.tableCell}>{item?.status}</Text>
                  </View>
                  <View style={styles.tableColStock}>
                    <Text style={styles.tableCell}>{item?.nilai}</Text>
                  </View>
                  {/* <View style={styles.tableColCate}>
                {item.kategory.map((items) => (
                  <Text style={styles.tableCellCate}>
                    {items.nama_kategori}
                  </Text>
                ))}
              </View>
              <View style={styles.tableColUpdate}>
                <Text style={styles.tableCell}>
                  {convertDateFormat(item.tgl_update)}
                </Text>
              </View> */}
                </View>
              ))}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
