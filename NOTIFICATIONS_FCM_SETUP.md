# Configuration des Notifications Push (Alternative Firebase)

Ce document décrit la méthode alternative gratuite pour gérer les notifications push sur l'application mobile Darassa Academy, en utilisant votre propre compte Firebase au lieu du serveur de notifications par défaut de Moodle (qui peut nécessiter un abonnement).

## 1. Principe
L'application mobile Moodle utilise par défaut `messages.moodle.net` (Airnotifier) comme passerelle pour les notifications. Cette passerelle a des limitations en version gratuite. L'alternative consiste à configurer l'application et le serveur Moodle pour utiliser directement votre propre projet Firebase Cloud Messaging (FCM).

**Architecture :** Moodle LMS (Plugin) -> Votre Firebase -> Google/Apple -> App Darassa Academy

## 2. Configuration Firebase (Google)
1.  Allez sur la [Console Firebase](https://console.firebase.google.com/).
2.  Créez un nouveau projet (ex: `DarassaAcademy`).
3.  Ajoutez une application **Android** :
    *   **Package name :** `com.darassa.academy`
    *   Téléchargez le fichier `google-services.json`.
4.  Si vous déployez sur **iOS**, ajoutez une application iOS :
    *   **Bundle ID :** `com.darassa.academy`
    *   Téléchargez le fichier `GoogleService-Info.plist`.

## 3. Configuration de l'Application Mobile
Les fichiers de configuration téléchargés depuis Firebase doivent être placés à la racine de ce dossier de projet.

1.  **Android :** Placez `google-services.json` dans `c:\laragon\www\moodleapp\`.
    *   *Note :* Le fichier est déjà référencé dans `config.xml` : `<resource-file src="google-services.json" target="app/google-services.json" />`.
2.  **iOS :** Placez `GoogleService-Info.plist` dans `c:\laragon\www\moodleapp\`.
    *   *Note :* Référencé dans `config.xml` : `<resource-file src="GoogleService-Info.plist" />`.

Aucune modification du code source TypeScript n'est requise. Le plugin `phonegap-plugin-push` détectera automatiquement ces fichiers lors de la compilation.

## 4. Configuration du Serveur Moodle (LMS)
Pour que votre Moodle envoie les notifications à *votre* Firebase et non à celui de Moodle HQ, vous devez installer un plugin spécifique.

1.  Sur votre site Moodle (`https://learn.darassa.academy`), installez un plugin de notification compatible FCM.
    *   *Suggestions :* Recherchez "Mobile app (FCM) notifications" ou "local_mobile" (version modifiée pour FCM).
2.  Configurez le plugin avec les identifiants de votre projet Firebase :
    *   Vous aurez besoin de la **Clé Serveur (Server Key)** ou du fichier de compte de service JSON (téléchargeable dans la console Firebase > Paramètres du projet > Comptes de service).
3.  Allez dans **Administration du site > Plugins > Sorties de message > Gérer les sorties de message**.
    *   Désactivez la sortie "Mobile" par défaut (Airnotifier).
    *   Activez la nouvelle sortie correspondant à votre plugin FCM.

## 5. Validation
Une fois configuré :
1.  Connectez-vous à l'application mobile.
2.  L'application s'enregistrera auprès de *votre* Firebase et enverra le token au serveur Moodle.
3.  Déclenchez une notification depuis Moodle (ex: envoyez un message à l'utilisateur).
4.  La notification devrait apparaître sur le téléphone via votre infrastructure Firebase gratuite.
