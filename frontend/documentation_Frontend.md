
# Anleitung zur Einrichtung des Frontends

## Verwendete Technologien
- **React**
- **CSS/HTML**
- **Typescript**
- **Axios**

## Starten des Frontends

1. **Abhängigkeiten installieren:**
    - Führen Sie den folgenden Befehl im `frontend`-Verzeichnis des Projekts aus, um alle Abhängigkeiten zu installieren (Docker wird nicht verwendet):
    - Navigieren Sie zum `frontend`-Verzeichnis 
      ```bash
      cd frontend
      ```
    - Installieren Sie die Abhängigkeiten 
      ```bash
      npm install
      ```

2. **Starten Sie das React-Frontend:**
    - Stellen Sie im Verzeichnis `frontend` sicher, dass Sie den folgenden Befehl ausführen, um das Frontend zu starten:
      ```bash
      npm start
      ```
    **Jetzt ist das Frontend eingerichtet und sollte auf dem Standardport 3000 von React laufen.**

# Überblick über die Benutzeroberfläche der Anwendung

Dieser Abschnitt bietet einen Überblick über die Benutzeroberfläche unserer Reiseverwaltungsanwendung. Er beschreibt die Hauptseiten und Funktionen, die Benutzer bei der Interaktion mit der Anwendung erwarten können.

## Startseite

Die Startseite bietet Navigation zu verschiedenen Hauptfunktionen der Anwendung mit Buttons:

## Navigation

    Reise verwalten: Navigiert zur Seite, um eine Reise zu erstellen, zu suchen, zu aktualisieren oder zu löschen.

    Reiseziel verwalten: Navigiert zur Seite, um Ziele zu verwalten.(um eine Reise zu löschen müssen Sie erstmal die Reise suchen(über Suchen button))

    Stadtinfo: Navigiert zur Seite, um Informationen über eine Stadt anzuzeigen.

    Alle Reisen schauen: Zeigt eine Liste aller Reisen als Tabelle an.
