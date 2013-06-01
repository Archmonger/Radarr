"use strict";
define(['app', 'Series/Details/SeasonCollectionView','Shared/LoadingView'], function () {
        NzbDrone.Series.Details.SeriesDetailsLayout = Backbone.Marionette.Layout.extend({

            itemViewContainer: '.x-series-seasons',
            template         : 'Series/Details/SeriesDetailsTemplate',

            regions: {
                seasons: '#seasons'
            },

            onShow: function () {

                var self = this;

                this.seasons.show(new NzbDrone.Shared.LoadingView());

                this.seasonCollection = new NzbDrone.Series.SeasonCollection();
                this.episodeCollection = new NzbDrone.Series.EpisodeCollection();

                $.when(this.episodeCollection.fetch({data: { seriesId: this.model.id }}), this.seasonCollection.fetch({data: { seriesId: this.model.id }}))
                    .done(function () {
                        self.seasons.show(new NzbDrone.Series.Details.SeasonCollectionView({
                            collection       : self.seasonCollection,
                            episodeCollection: self.episodeCollection
                        }));
                    }
                );
            },

            onClose: function () {
                $('.backstretch').remove();
            }
        });
    }
);
