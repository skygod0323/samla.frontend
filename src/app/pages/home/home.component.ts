import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { MatDialog } from '@angular/material';
import { CheckoutModalComponent } from 'src/app/shared/modal/checkout-modal/checkout-modal.component';
import { CheckDoneModalComponent } from 'src/app/shared/modal/checkdone-modal/checkdone-modal.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  filteredList = [];
  imageList = [];
  categoryList = [];
  loading = false;
  public searchKey = '';
  maxImageCount = 20;

  firstSelect = true;

  column1 = [];
  column2 = [];
  column3 = [];
  column4 = [];

  constructor(
    public api: Api,
    public notify: NotifyService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadImages();
    this.loadCategoryList();
  }

  loadImages() {
    this.notify.showLoading();
    this.loading = true;

    this.api.getImageList().subscribe((res: any) => {

      this.notify.hideLoading();
      this.loading = false;

      if (res.success) {
        this.imageList = res.data;

        //this.filteredList = this.imageList;
        this.splitToColumns();
      } else {
        this.notify.showNotification('error', 'Error');
      }
    }, err => {
      this.notify.hideLoading();
      this.loading = false;
      this.notify.showNotification('error', 'Error');
    });
  }

  loadCategoryList() {
    this.notify.showLoading();
    this.loading = true;

    this.api.getCategoryList().subscribe((res: any) => {

      this.notify.hideLoading();
      this.loading = false;

      if (res.success) {
        this.categoryList = res.data;

        this.categoryList.forEach(element => {
          element.selected = true;
        });
      } else {
        this.notify.showNotification('error', 'Error');
      }
    }, err => {
      this.notify.hideLoading();
      this.loading = false;
      this.notify.showNotification('error', 'Error');
    });
  }

  filter() {
    this.maxImageCount = 20;                 //////     reset max image count to show 
    var queryString = this.searchKey.toLowerCase();

    var queries = queryString.split(' ');

    queries = queries.filter(item => {
      return item != "";
    })

    this.filteredList = [];

    var selectedCategoris = this.categoryList.filter(item => {
      return item.selected;
    });

    var selectedCategoryIds = selectedCategoris.map(item => item.id);

    this.filteredList = this.imageList.filter(item => {
      for (var i = 0; i < item.categories.length; i++) {
        if (selectedCategoryIds.indexOf(item.categories[i]['id']) > -1) return true;
      }
    })

    if (queries.length > 0) {
      this.filteredList = this.filteredList.filter(item => {
        // if (item['title'].toLowerCase().indexOf(queryString) > -1) return true;
        // if (item['name'].toLowerCase().indexOf(queryString) > -1) return true;

        var tmp = new Array(queries.length);

        for (var j = 0; j < queries.length; j++) {
          tmp[j] = false;
          var query = queries[j];

          if (item['title'].toLowerCase().indexOf(query) > -1) tmp[j] = true;   //// title search

          for (var i = 0; i < item.tags.length; i++) {              /////   tag search
            if (item.tags[i].toLowerCase().indexOf(query) > -1) tmp[j] = true;
          }

          if (!tmp[j]) return false;
        }

        return true; /////////////   

      });
    }

    this.splitToColumns();

    console.log(this.filteredList);

  }

  splitToColumns() {
    this.column1 = [];
    this.column2 = [];
    this.column3 = [];
    this.column4 = [];

    var count = Math.min(this.maxImageCount, this.filteredList.length);

    for (var i = 0; i < count; i++) {
      var tmp = i % 4;
      switch (tmp) {
        case 0:
          this.column1.push(this.filteredList[i]); break;
        case 1:
          this.column2.push(this.filteredList[i]); break;
        case 2:
          this.column3.push(this.filteredList[i]); break;
        case 3:
          this.column4.push(this.filteredList[i]); break;
      }
    }
  }

  loadMore() {
    this.maxImageCount = this.maxImageCount + 20;
    this.splitToColumns();
  }

  selectItem(item) {
    item.selected = !item.selected;
  }

  getSelectedCount() {
    var count = 0;
    for (var i = 0; i < this.imageList.length; i++) {
      if (this.imageList[i].selected) {
        count++;
      }
    }

    return count;
  }

  clearSelection() {
    for (var i = 0; i < this.imageList.length; i++) {
      this.imageList[i].selected = false;
    }
  }

  selectCategory(item) {

    if (this.firstSelect) {
      for (var i = 0; i < this.categoryList.length; i++) {
        this.categoryList[i].selected = false;
      }

      item.selected = true;

      this.firstSelect = false;
    } else {
      item.selected = !item.selected;
    }


    this.filter();
  }

  selectAllCategory() {
    for (var i = 0; i < this.categoryList.length; i++) {
      this.categoryList[i].selected = true;
    }

    this.filter();
  }

  continue() {

    let dialogRef = this.dialog.open(CheckoutModalComponent, {
      disableClose: true,
      width: '400px',
      panelClass: 'checkout-modal-container',
      backdropClass: 'checkout-backdrop'
    });

    dialogRef.afterClosed().subscribe(modal_res => {
      if (modal_res.type == 'apply') {
        console.log(modal_res.data);

        this.checkout(modal_res.data);
      }
    })
  }

  checkout(info) {

    //this.notify.showNotification('error', 'Failed');
    var selectedImages = this.imageList.filter(item => item.selected);

    var selectedImageIds = selectedImages.map(item => item.id);

    console.log(selectedImageIds);

    this.notify.showLoading();

    this.api.checkout({
      info: info,
      images: selectedImageIds
    }).subscribe((res: any) => {

      this.notify.hideLoading();

      if (res.success) {
        //this.notify.showNotification('success', 'sent link to your email');

        this.showCheckDoneModal();

      } else {
        this.notify.showNotification('error', 'failed');
      }
    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'failed');
    })

  }

  showCheckDoneModal() {
    let dialogRef = this.dialog.open(CheckDoneModalComponent, {
      disableClose: true,
      width: '1200px',
      panelClass: 'checkdone-modal-container',
      backdropClass: 'checkdone-backdrop'
    });

    dialogRef.afterClosed().subscribe(modal_res => {
      console.log(modal_res);
      if (modal_res.type == 'keep') {

      } else if (modal_res.type == "clear") {
        this.clearSelection();
      }
    })
  }

  isSelectedAllCategory() {
    var isSelectedAll = true;
    this.categoryList.forEach(element => {
      if (!element.selected) isSelectedAll = false;
    });

    return isSelectedAll;
  }
}
