import View from './View';
import previewView from './previewView';
class BookmarksView extends View {
  _ParentElement = document.querySelector('.bookmarks__list');
  _messageError = 'No bookmarks yet. Find a nice recipe and bookmark it. :(';
  _message = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    // console.log(this._data);
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
