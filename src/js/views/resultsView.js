import View from './View';
import previewView from './previewView';
class ResultsView extends View {
  _ParentElement = document.querySelector('.results');
  _messageError = 'We could not find that recipe. Please try again.';
  _message = '';
  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
