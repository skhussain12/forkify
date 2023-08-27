import View from './View';
import icons from 'url:../../img/icons.svg';
class PaginationView extends View {
  _ParentElement = document.querySelector('.pagination');
  addHandlerClick(handler) {
    this._ParentElement.addEventListener('click', function (e) {
      e.preventDefault();
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      //   console.log(btn, goToPage);
      handler(goToPage);
    });
  }
  _generateMarkup() {
    const curPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultPerPage
    );
    console.log(numPage);
    //1 page , and there are other pages
    if (curPage === 1 && numPage > 1) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="Page ${icons}#icon-arrow-right"></use>
      </svg>
    </button>`;
    }

    //3 other pages
    if (curPage < numPage) {
      return ` <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    <button data-goto="${
      curPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //4 last page
    if (curPage === numPage && numPage > 1) {
      return `<button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
    }
    //2 page , and there are no other pages
    return ``;
  }
}

export default new PaginationView();
