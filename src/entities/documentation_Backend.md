
# Backend-Anleitung

## Verwendete Technologien
- **TypeOrm**
- **Postgres**
- **Typescript**
- **Express**

## Starten des Backends

1. **Abhängigkeiten installieren:**
   - Führen Sie den folgenden Befehl im Hauptverzeichnis des Projekts aus, um alle Abhängigkeiten zu installieren (Docker wird nicht verwendet):
     ```
     npm install
     ```

2. **Datenbankkonfiguration:**
   - **PostgreSQL-Datenbank-Anmeldeinformationen ändern:**
      
      - In der Datei [index.ts] müssen Sie von Zeile 25 bis Zeile 33 den Benutzernamen, die Datenbank und das Passwort an Ihre Datenbankkonfiguration anpassen.
      

## Starten der Anwendung

- Führen Sie die folgenden Befehle aus, um die Anwendung zu starten. Dies wird die App jedes Mal starten, wenn Sie sie ausführen. Beim ersten Start wird der Befehl auch die Postgres-Tabellen in der angegebenen Datenbank erstellen:

```bash
npm run dev  
```

#### Lösung des Fehlers "Port bereits in Verwendung" bei der Backend-Einrichtung

Wenn Sie beim Starten Ihres Backend-Servers auf das Problem `listen EADDRINUSE: address already in use :::portnumber` stoßen, bedeutet dies, dass der angegebene Port von einem anderen Prozess verwendet wird. So lösen Sie dieses Problem:

1. **Portkonfiguration ändern:**

   - **Ändern Sie nur** die Portnummer.
   - Drücken Sie `Ctrl + S`, um die Datei zu speichern. Dadurch wird das Backend mit dem neuen ausgewählten Port neu gestartet.

3. **Überprüfen Sie den erfolgreichen Neustart:**
   - Nach dem Neustart des Backends sollten Sie die folgenden Bestätigungsmeldungen sehen:
     ```
     Connected to Postgres on port: 5432
     Local Host Running on Port: 8080
     Server is running on http://localhost:8080
     ```
   - Ihr Backend ist jetzt betriebsbereit.

## Datenbank füllen

Die Datenbank ist jetzt leer. Wenn Sie sie mit Reisen und Zielen sowie den Beziehungen zwischen beiden füllen möchten, müssen Sie dies manuell tun oder die [Postman v2.1-Sammlung] importieren.

## API

Zum Testen der APIs wurde eine [Postman v2.1-Sammlung]hinzugefügt.

Sie müssen diese Datei herunterladen und in Postman importieren, um Zugriff auf alle 10 API-Anfragen zu erhalten, die zu Testzwecken erforderlich sind.

Die folgenden CRUD-Funktionen sind implementiert:

| Endpunkt                                          | Methode       | Beschreibung
|---------------------------------------------------|--------------| -----------
| /Reise                                           | ```GET```    | Ruft alle Reisen in der Datenbank ab (im JSON-Format).
| Reisen/search?name=`name`&reisezeitraum=`reisezeitraum`| ```GET```    | Ruft Reisen in der Datenbank basierend auf dem angegebenen Namen und Zeitraum ab. Die Filterung kann nach Namen oder Zeitraum erfolgen. (im JSON-Format)
| /Reiseziel/:reisezielId=`reisezielId`/Reisen           | ```GET```    | Ruft Reisen in der Datenbank basierend auf der Ziel-ID ab. (im JSON-Format)
/Reise/:reiseId=`reiseId`/Reiseziele          | ```GET```    | Ruft Ziele in der Datenbank basierend auf der Reise-ID ab. (im JSON-Format)
/Reiseziel          | ```GET```    | Ruft alle Ziele in der Datenbank ab. (im JSON-Format)
| /CityInfo?name=`cityName`                          | ```GET```    | Wrapper für die externe API, die Informationen über die Stadt zurückgibt. (im JSON-Format).
| /Reise/:reiseId=`ReiseId`/export                      | ```GET```  | Gibt eine Reise und ihre Ziele als CSV-Daten zurück. (Antwortkörper im CSV-Format).
| /Reiseziel/:reisezielId=`ReisezielId`             | ```PATCH```  | Aktualisiert das ausgewählte Ziel. (im JSON-Format) **Hinweis:** Basierend auf der Ziel-ID.
|/Reise/:reiseId=`ReiseId`                             | ```PATCH```  | Aktualisiert eine Reise. (Anfragekörper im JSON-Format)
| /Reise/:reiseId=`reiseId`/Reiseziel/:reisezielId=`reisezielId`    | ```DELETE``` | Entfernt das Ziel von der Reise mit der angegebenen Reise-ID.
| /Reise/:reiseId=`reiseID`                             | ```DELETE``` | Löscht die Reise mit der angegebenen Reise-ID. **Hinweis:** Reise-ID ist eine Nummer.
| /Reise                                         | ```POST```   | Erstellt eine neue Reise (JSON-Körper erforderlich). 
| /Reiseziel                              | ```POST```   | Erstellt ein neues Ziel (JSON-Körper erforderlich).

## Freestyle-Aufgabe #1: KEINE externe API

Ich habe eine Speicheroption hinzugefügt, um die **aktuellen** Reisen und ihre Ziele als CSV-Datei auf dem aktuellen PC zu speichern. Natürlich gibt es auch einen Frontend-Button für diese Option. 
Dies speichert nur die Reisen und ihre Informationen sowie ihre Ziele mit ihren Informationen.

Diese Funktion finden Sie unter `exportReiseToCSV.ts` und Sie können sie im Backend mit Postman testen.

## Freestyle-Aufgabe #2: Externe API

Für die externe API habe ich mich für die kostenlose Wetter-API von [api-ninjas.com](https://api-ninjas.com/) entschieden, die ich später modifiziert habe, um eine bessere Interpretation der Informationen für jede Stadt zu bieten.
in `externe_Api.ts`

Der API-Schlüssel ist standardmäßig ausgeblendet. Klicken Sie, um ihn anzuzeigen.

<details>
<summary id="apikey">API-Schlüssel</summary>

PYOEHI/fUsMxiFk9GRQ9sA==J3N6TvR6izc543In
</details>
