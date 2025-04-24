package src.database;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnexioBD {
    // Private static instance of the class
    private static Connection connect;

    // Private constructor to prevent instantiation
    private ConnexioBD() {
    }

    private static void openConection() {
        connect = null;
        try {
            connect = DriverManager.getConnection(DataConnection.getURL(), DataConnection.getUSR(), DataConnection.getPWD());
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    // Public static method to get the instance of the class
    public static Connection getInstance() {
        if (connect == null) {
            openConection();
        }
        return connect;
    }

    // Public method to close the connection
    public void closeConnection() {
        try {
            connect.close();
        } catch (SQLException e) {
            System.out.println("ERROR: " + e.getMessage());
        }
    }
}