import { Component } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

/**
 * File data with nested structure.
 * Each node has a name and an optional list of children.
 */
interface FileNode {
  name: string;
  children?: FileNode[];
}

const TREE_DATA: FileNode[] = [{
  name: 'Docs',
  children: [{
    name: 'Doc 1'
  }, {
    name: 'Doc 2'
  }, {
    name: 'Doc 3'
  }],
}, {
  name: 'Images',
  children: [{
    name: 'Images Sub 1',
    children: [{
      name: 'Image 1'
    }, {
      name: 'Image 7'
    }],
  }, {
    name: 'Images Sub 2',
    children: [{
      name: 'Image 12'
    }, {
      name: 'Image 26'
    }],
  }],
}, {
  name: 'Projects',
  children: [],
}];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  treeControl = new NestedTreeControl<FileNode>(node => node.children);
  dataSource = new MatTreeNestedDataSource<FileNode>();

  constructor() {
    this.dataSource.data = TREE_DATA;
  }

  hasChild = (_: number, node: FileNode) => !!node.children && node.children.length > 0;

  isFolder = (_: number, node: FileNode) => !!node.children && node.children.length >= 0;
}
