
(function() {
    var t;
    t = angular.module("treeGridCustom", []), t.directive("treeGridCustom", ["$timeout", function(t) {
        return {
            restrict: "E",
            controller: "GridController",
            template: '<div>              <table class="table table-bordered table-striped tree-grid-custom">                  <thead class="text-primary">                  <tr>                      <th>{{expandingProperty}}</th>                      <th ng-repeat="col in colDefinitions" class="text-center">{{col.displayName || col.field}}</th>                  </tr>                  </thead>                  <tbody>                  <tr ng-repeat="row in tree_rows | filter:{visible:true} track by row.branch.uid"                      ng-class="\'level-\' + {{ row.level }} + (row.branch.selected ? \' active\':\'\')" class="tree-grid-row">                      <td class="text-primary"><a ng-click="user_clicks_branch(row.branch)"><i ng-class="row.tree_icon"                                 ng-click="row.branch.expanded = !row.branch.expanded"                                 class="indented tree-icon"></i>                          </a><span class="indented tree-label" ng-click="user_clicks_branch(row.branch)">                            {{row.branch[expandingProperty]}}</span>                      </td>                      <td ng-repeat="col in colDefinitions" class="text-center">                        <input type="checkbox" ng-disabled="myPermissions[row.branch.id][3] != true" ng-model="permissions[row.branch.id][col.id]" ng-change="changePermission(row.branch.id, col.id)">                         <!--input type="checkbox" ng-disabled="myPermissions[row.branch.id][3] != true" ng-model="model[row[col.id]].checked" ng-checked="permissions[row.branch.id][col.id]" ng-change="changePermission(row.branch.id, col.id)"-->                       </td>                  </tr>                  </tbody>              </table><!--pre>{{permissions | json}}</pre-->          </div>',
            replace: !0,
            transclude: !0,
            scope: {
                permissions: "=",
                treeData: "=",
                colDefs: "=",
                expandOn: "=",
                onSelect: "&",
                initialSelection: "@",
                treeControl: "="
            },
            transclude: !0,
            link: function(e, n, i) {
                var r, o, a, s, l, c, u, h, d, p, f, g;
                if (r = function(t) {
                        return void console.log("ERROR:" + t)
                    }, null == i.iconExpand && (i.iconExpand = "icon-plus  glyphicon glyphicon-plus  fa fa-plus"), null == i.iconCollapse && (i.iconCollapse = "icon-minus glyphicon glyphicon-minus fa fa-minus"), null == i.iconLeaf && (i.iconLeaf = "icon-file  glyphicon glyphicon-file  fa fa-file"), null == i.expandLevel && (i.expandLevel = "3"), s = parseInt(i.expandLevel, 10), !e.treeData) return void alert("no treeData defined for the tree!");
                if (null == e.treeData.length) {
                    if (null == treeData.label) return void alert("treeData should be an array of root branches");
                    e.treeData = [treeData]
                }
                if (i.expandOn) o = e.expandOn, e.expandingProperty = e.expandOn;
                else {
                    for (var m = e.treeData[0], v = Object.keys(m), y = 0, b = v.length; b > y; y++)
                        if ("string" == typeof m[v[y]]) {
                            o = v[y];
                            break
                        }
                    o || (o = v[0]), e.expandingProperty = o
                }
                if (i.colDefs) e.colDefinitions = e.colDefs;
                else {
                    var x = [],
                        m = e.treeData[0],
                        $ = ["children", "level", "expanded", o];
                    for (var w in m) - 1 == $.indexOf(w) && x.push({
                        field: w
                    });
                    e.colDefinitions = x
                }
                return c = function(t) {
                    var n, i, r, o, a, s;
                    for (n = function(e, i) {
                            var r, o, a, s, l;
                            if (t(e, i), null != e.children) {
                                for (s = e.children, l = [], o = 0, a = s.length; a > o; o++) r = s[o], l.push(n(r, i + 1));
                                return l
                            }
                        }, a = e.treeData, s = [], r = 0, o = a.length; o > r; r++) i = a[r], s.push(n(i, 1));
                    return s
                }, f = null, p = function(n) {
                    if (!n) return null != f && (f.selected = !1), void(f = null);
                    if (n !== f) {
                        if (null != f && (f.selected = !1), n.selected = !0, f = n, a(n), null != n.onSelect) return t(function() {
                            return n.onSelect(n)
                        });
                        if (null != e.onSelect) return t(function() {
                            return e.onSelect({
                                branch: n
                            })
                        })
                    }
                }, e.user_clicks_branch = function(t) {
                    return t !== f ? p(t) : void 0
                }, u = function(t) {
                    var e;
                    return e = void 0, t.parent_uid && c(function(n) {
                        return n.uid === t.parent_uid ? e = n : void 0
                    }), e
                }, l = function(t, e) {
                    var n;
                    return n = u(t), null != n ? (e(n), l(n, e)) : void 0
                }, a = function(t) {
                    return l(t, function(t) {
                        return t.expanded = !0
                    })
                }, e.tree_rows = [], d = function() {
                    var t, n, r, a, s, l;
                    for (c(function(t) {
                            return t.uid ? void 0 : t.uid = "" + Math.random()
                        }), c(function(t) {
                            var e, n, i, r, o;
                            if (angular.isArray(t.children)) {
                                for (r = t.children, o = [], n = 0, i = r.length; i > n; n++) e = r[n], o.push(e.parent_uid = t.uid);
                                return o
                            }
                        }), e.tree_rows = [], c(function(t) {
                            var e, n;
                            return t.children ? t.children.length > 0 ? (n = function(t) {
                                return "string" == typeof t ? {
                                    label: t,
                                    children: []
                                } : t
                            }, t.children = function() {
                                var i, r, o, a;
                                for (o = t.children, a = [], i = 0, r = o.length; r > i; i++) e = o[i], a.push(n(e));
                                return a
                            }()) : void 0 : t.children = []
                        }), t = function(n, r, a) {
                            var s, l, c, u, h, d, p;
                            if (null == r.expanded && (r.expanded = !1), c = r.children && 0 !== r.children.length ? r.expanded ? i.iconCollapse : i.iconExpand : i.iconLeaf, r.level = n, e.tree_rows.push({
                                    level: n,
                                    branch: r,
                                    label: r[o],
                                    tree_icon: c,
                                    visible: a
                                }), null != r.children) {
                                for (d = r.children, p = [], u = 0, h = d.length; h > u; u++) s = d[u], l = a && r.expanded, p.push(t(n + 1, s, l));
                                return p
                            }
                        }, s = e.treeData, l = [], r = 0, a = s.length; a > r; r++) n = s[r], l.push(t(1, n, !0));
                    return l
                }, e.$watch("treeData", d, !0), null != i.initialSelection && c(function(e) {
                    return e.label === i.initialSelection ? t(function() {
                        return p(e)
                    }) : void 0
                }), h = e.treeData.length, c(function(t, e) {
                    return t.level = e, t.expanded = t.level < s
                }), null != e.treeControl && angular.isObject(e.treeControl) ? (g = e.treeControl, g.expand_all = function() {
                    return c(function(t) {
                        return t.expanded = !0
                    })
                }, g.collapse_all = function() {
                    return c(function(t) {
                        return t.expanded = !1
                    })
                }, g.get_first_branch = function() {
                    return h = e.treeData.length, h > 0 ? e.treeData[0] : void 0
                }, g.select_first_branch = function() {
                    var t;
                    return t = g.get_first_branch(), g.select_branch(t)
                }, g.get_selected_branch = function() {
                    return f
                }, g.get_parent_branch = function(t) {
                    return u(t)
                }, g.select_branch = function(t) {
                    return p(t), t
                }, g.get_children = function(t) {
                    return t.children
                }, g.select_parent_branch = function(t) {
                    var e;
                    return null == t && (t = g.get_selected_branch()), null != t && (e = g.get_parent_branch(t), null != e) ? (g.select_branch(e), e) : void 0
                }, g.add_branch = function(t, n) {
                    return null != t ? (t.children.push(n), t.expanded = !0) : e.treeData.push(n), n
                }, g.add_root_branch = function(t) {
                    return g.add_branch(null, t), t
                }, g.expand_branch = function(t) {
                    return null == t && (t = g.get_selected_branch()), null != t ? (t.expanded = !0, t) : void 0
                }, g.collapse_branch = function(t) {
                    return null == t && (t = f), null != t ? (t.expanded = !1, t) : void 0
                }, g.get_siblings = function(t) {
                    var n, i;
                    return null == t && (t = f), null != t ? (n = g.get_parent_branch(t), i = n ? n.children : e.treeData) : void 0
                }, g.get_next_sibling = function(t) {
                    var e, n;
                    return null == t && (t = f), null != t && (n = g.get_siblings(t), h = n.length, e = n.indexOf(t), h > e) ? n[e + 1] : void 0
                }, g.get_prev_sibling = function(t) {
                    var e, n;
                    return null == t && (t = f), n = g.get_siblings(t), h = n.length, e = n.indexOf(t), e > 0 ? n[e - 1] : void 0
                }, g.select_next_sibling = function(t) {
                    var e;
                    return null == t && (t = f), null != t && (e = g.get_next_sibling(t), null != e) ? g.select_branch(e) : void 0
                }, g.select_prev_sibling = function(t) {
                    var e;
                    return null == t && (t = f), null != t && (e = g.get_prev_sibling(t), null != e) ? g.select_branch(e) : void 0
                }, g.get_first_child = function(t) {
                    var e;
                    return null == t && (t = f), null != t && (null != (e = t.children) ? e.length : void 0) > 0 ? t.children[0] : void 0
                }, g.get_closest_ancestor_next_sibling = function(t) {
                    var e, n;
                    return e = g.get_next_sibling(t), null != e ? e : (n = g.get_parent_branch(t), g.get_closest_ancestor_next_sibling(n))
                }, g.get_next_branch = function(t) {
                    var e;
                    return null == t && (t = f), null != t ? (e = g.get_first_child(t), null != e ? e : e = g.get_closest_ancestor_next_sibling(t)) : void 0
                }, g.select_next_branch = function(t) {
                    var e;
                    return null == t && (t = f), null != t && (e = g.get_next_branch(t), null != e) ? (g.select_branch(e), e) : void 0
                }, g.last_descendant = function(t) {
                    var e;
                    return h = t.children.length, 0 === h ? t : (e = t.children[h - 1], g.last_descendant(e))
                }, g.get_prev_branch = function(t) {
                    var e, n;
                    return null == t && (t = f), null != t ? (n = g.get_prev_sibling(t), null != n ? g.last_descendant(n) : e = g.get_parent_branch(t)) : void 0
                }, g.select_prev_branch = function(t) {
                    var e;
                    return null == t && (t = f), null != t && (e = g.get_prev_branch(t), null != e) ? (g.select_branch(e), e) : void 0
                }) : void 0
            }
        }
    }])
}).call(this);
