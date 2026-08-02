// Construit le lien podcastapp:// correspondant à la page courante.
// Les URL web sont volontairement de la forme /PodcastApp/<section>/?id=...
// (paramètre de requête et non segment de chemin) pour que chaque cible
// reste une page réelle servie en 200 par GitHub Pages.
(function () {
  var params = new URLSearchParams(window.location.search);
  var section = document.body.dataset.section;
  var label = document.getElementById('target');
  var open = document.getElementById('open');

  function value(name) {
    var raw = params.get(name);
    return raw && raw.trim() ? raw.trim() : null;
  }

  var uri = null;
  var described = null;

  switch (section) {
    case 'podcast': {
      var podcastId = value('id');
      if (podcastId) {
        uri = 'podcastapp://podcast/' + encodeURIComponent(podcastId);
        described = 'Podcast ' + podcastId;
      }
      break;
    }
    case 'playlist': {
      var playlistId = value('id');
      if (playlistId) {
        uri = 'podcastapp://playlist/' + encodeURIComponent(playlistId);
        described = 'Playlist ' + playlistId;
      }
      break;
    }
    case 'profile': {
      var username = value('u');
      var userId = value('id');
      if (username) {
        uri = 'podcastapp://profile/u/' + encodeURIComponent(username.replace(/^@/, ''));
        described = '@' + username.replace(/^@/, '');
      } else if (userId) {
        uri = 'podcastapp://profile/' + encodeURIComponent(userId);
        described = 'Profil ' + userId;
      }
      break;
    }
    case 'browse': {
      var genre = value('genre');
      uri = genre ? 'podcastapp://browse/' + encodeURIComponent(genre) : 'podcastapp://browse';
      described = genre ? 'Catégorie « ' + genre + ' »' : null;
      break;
    }
    case 'search': {
      var query = value('q');
      uri = query
        ? 'podcastapp://search?q=' + encodeURIComponent(query)
        : 'podcastapp://search';
      described = query ? 'Recherche « ' + query + ' »' : null;
      break;
    }
    default:
      break;
  }

  if (uri && open) {
    open.href = uri;
  } else if (open) {
    open.href = 'podcastapp://' + (section || 'browse');
  }

  if (described && label) {
    label.textContent = described;
    label.hidden = false;
  }
})();
